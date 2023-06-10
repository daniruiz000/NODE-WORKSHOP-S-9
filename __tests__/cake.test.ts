import mongoose from "mongoose";
import { mongoConnect } from "../src/domain/repositories/mongo-repository";
import { app } from "../src/server/index";
import { appInstance } from "../src/index";
import { type ICake, Cake, ingredientsEnum, allergensEnum } from "../src/domain/entities/cake-entity";
import request from "supertest";
import { IUser, User } from "../src/domain/entities/user-entity";
// Tenemos que tener una BBDD especifica de test.

describe("Cake Controler", () => {
  const cakeMock: ICake = {
    name: "Tarta de ron",
    price: 23,
    description: "Tierna tarta de ron",
    ingredients: [ingredientsEnum.CARAMELO],
    allergens: [allergensEnum.gluten],
  };

  const userMock: IUser = {
    email: "admin@gmail.com",
    password: "55555555",
    name: "admin",
  };

  let token: string;
  let cakeId: string;

  // Antes de hacer los tests:
  beforeAll(async () => {
    await mongoConnect(); // Conecto a mongo pero a la BBDD de test mediante la biblioteca cross-env que nos permite modificar la variable de entorno del nombre de la BBDD desde el script de test.
    await Cake.collection.drop();
    await User.collection.drop();

    const user = new User(userMock);
    await user.save();
  });
  // Cuando acaben los test:
  afterAll(async () => {
    await mongoose.connection.close(); // Cerramos la conexión a mongo.
    appInstance.close();
  });

  it("POST /login with validated credentials return 200 and token", async () => {
    const credentials = {
      email: userMock.email,
      password: userMock.password,
    };
    const response = await request(app).post("/user/login").send(credentials).expect(200);

    expect(response.body).toHaveProperty("token");
    token = response.body.token;
    console.log(token);
  });
  it("POST /login with wrong credentials return 401 and no token", async () => {
    const credentials = {
      email: "noexistingemail",
      password: "123",
    };
    const response = await request(app).post("/user/login").send(credentials).expect(401);

    expect(response.body.token).toBeUndefined();
  });

  it("POST /cake = this should create a cake", async () => {
    const response = await request(app).post("/cake").send(cakeMock).set("Authorization", `Bearer ${token}`).expect(201);
    expect(response.body._id).toBe(cakeId);
  });

  it("GET /cake returns a list with the cakes", async () => {
    const response = await request(app).get("/cake").send(cakeMock).expect(200);
    expect(response.body.data).toBeDefined(); // Esperamos que data este definido en la respuesta
    expect(response.body.data).toHaveLength(1); // Esperamos que data tenga un elemento
  });
  it("PUT /cake/id Modify cake when token is send", async () => {
    const updatedData = {
      name: "Tarta de Ron",
    };
    const response = await request(app).put(`/cake/${cakeId}`).set("Authorization", `Bearer ${token}`).send(updatedData).expect(200);
    expect(response.body.name).toBe(updatedData.name);
    expect(response.body._id).toBe(cakeId);
  });
  it("PUT /cake/id Should not modify cake when no token is present", async () => {
    const updatedData = {
      ingredients: ingredientsEnum.COCO,
    };
    const response = await request(app).put(`/cake/${cakeId}`).send(updatedData).expect(401);
    expect(response.body.error).toBe("No tienes autorización para realizar esta operación");
  });
  it("DELETE /cake/id Do not delete cake when token does not exist", async () => {
    const response = await request(app).delete(`/cake/${cakeId}`).expect(401);
    expect(response.body.error).toBe("No tienes autorización para realizar esta operación");
  });
  it("DELETE /cake/id Delete cake when token is ok", async () => {
    const response = await request(app).delete(`/cake/${cakeId}`).set("Authorization", `Bearer ${token}`).expect(201);
    expect(response.body._id).toBe(cakeId);
  });
});

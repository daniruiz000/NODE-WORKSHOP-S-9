import mongoose from "mongoose"
import { mongoConnect } from "../src/domain/repositories/mongo-repository"
import { app } from "../src/server/index"
import { appInstance } from "../src/index"
import { type IUser, User } from "../src/domain/entities/user-entity"
import request from "supertest"
// Tenemos que tener una BBDD especifica de test.

describe("User Controler", () => {
  const userMoc: IUser = {
    email: "dan@gmail.com",
    password: "123456789",
    name: "Dani",
  }
  // const adminMoc: IUser = {
  //   email: "admin@gmail.com",
  //   password: "55555555",
  //   name: "admin",
  // }

  let token: string
  let userId: string

  // Antes de hacer los tests:
  beforeAll(async () => {
    await mongoConnect() // Conecto a mongo pero a la BBDD de test mediante la biblioteca cross-env que nos permite modificar la variable de entorno del nombre de la BBDD desde el script de test.
    await User.collection.drop() // Borramos los usuarios de la BBDD
  })
  // Cuando acaben los test:
  afterAll(async () => {
    await mongoose.connection.close() // Cerramos la conexión a mongo.
    appInstance.close()
  })

  it("POST /user = this should create an user", async() => {
    const response = await request(app)
      .post("/user")
      .send(userMoc)
      .set("Accept", "application/json")
      .expect(201)

    expect(response.body).toHaveProperty("_id")
    expect(response.body.email).toBe(userMoc.email)
    userId = response.body._id
  })
  it("POST /user/login with valide credentials return 200 and token", async () => {
    const credentials = {
      email: userMoc.email,
      password: userMoc.password
    }
    const response = await request(app)
      .post("/user/login")
      .send(credentials)
      .expect(200)

    expect(response.body).toHaveProperty("token")
    token = response.body.token
    console.log(token)
  })
  it("POST /user/login with wrong credentials return 401 and no token", async () => {
    const credentials = {
      email: "noexistingemail",
      password: "123"
    }
    const response = await request(app)
      .post("/user/login")
      .send(credentials)
      .expect(401)

    expect(response.body.token).toBeUndefined()
  })
  it("GET /user/id returns a user by id", async () => {
    const response = await request(app)
      .put(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
    expect(response.body.email).toBe(userMoc.email)
    console.log(response.body)
  })
  it("PUT /user/id Modify user when token is send", async () => {
    const updatedData = {
      name: "Edu",
    }
    const response = await request(app)
      .put(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData)
      .expect(200)
    expect(response.body.name).toBe(updatedData.name)
    expect(response.body.email).toBe(userMoc.email)
    expect(response.body._id).toBe(userId)
  })
  it("PUT /user/id Should not modify user when no token is present", async () => {
    const updatedData = {
      name: "invented",
    }
    const response = await request(app)
      .put(`/user/${userId}`)
      .send(updatedData)
      .expect(401)
    expect(response.body.error).toBe("No tienes autorización para realizar esta operación")
  })
  it("DELET /user/id Do not delete user when token does not exist", async () => {
    const response = await request(app)
      .delete(`/user/${userId}`)
      .expect(401)
    expect(response.body.error).toBe("No tienes autorización para realizar esta operación")
  })
  it("DELET /user/id Delete user when token is ok", async () => {
    const response = await request(app)
      .delete(`/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
    expect(response.body._id).toBe(userId)
  })
})

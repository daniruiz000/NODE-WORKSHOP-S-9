// Importamos el modelo
import { User } from "../domain/entities/user-entity";

// Creamos 50 autores aleatoriamente y los vamos añadiendo al array de autores:
const userList = [
  { name: "Antonio Perez", email: "antonio@gmail.com", password: "12345678" },
  { name: "Lara Alcaráz", email: "lara@gmail.com", password: "87654321" },
  { name: "Leon López", email: "leon@gmail.com", password: "00000000" },
  { name: "Virginia Alonso", email: "virg@gmail.com", password: "11111111" },
  { name: "Ernesto Sevilla", email: "ernesto@gmail.com", password: "22222222" },
  { name: "Ana Obregón", email: "ana@gmail.com", password: "33333333" },
  { name: "Francisco Bueno", email: "frank@gmail.com", password: "44444444" },
  { name: "Toni Moreno", email: "toni@gmail.com", password: "55555555" },
];

//  Función de reseteo de documentos de la colección.
export const resetUsers = async (): Promise<void> => {
  try {
    await User.collection.drop(); //  Esperamos a que borre los documentos de la colección user de la BBDD.
    console.log("Borrados users");
    const documents = userList.map((user) => new User(user));
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      await document.save();
    }
    console.log("Creados users correctamente");
  } catch (error) {
    console.error(error);
  }
};

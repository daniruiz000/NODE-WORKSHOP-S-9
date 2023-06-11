import mongoose from "mongoose";

import { mongoConnect } from "../domain/repositories/mongo-repository"; // Importamos el archivo de conexión a la BBDD

import { resetUsers } from "./resetUsers";
import { resetCakes } from "./resetCakes";
import { resetCategories } from "./resetCategories";
import { tartinchisRelations } from "./tartinchisRelations";

const seedFunction = async (): Promise<void> => {
  try {
    await mongoConnect();
    await resetUsers();
    await resetCakes()
    await resetCategories()
    await tartinchisRelations()
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
};

void seedFunction();

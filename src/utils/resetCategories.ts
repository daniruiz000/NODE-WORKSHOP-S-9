import { Category } from "../domain/entities/category-entity";

const categoriesList = [
  {
    name: "Clásicas",
    description: "Tartas clásicas y tradicionales.",
  },
  {
    name: "Las más vendidas!!",
    description: "Nuestras tartas más vendidas.",
  },
  {
    name: "Exóticas",
    description: "Tartas de variedades que aún no has probado!.",
  },
];

export const resetCategories = async (): Promise<void> => {
  try {
    await Category.collection.drop();
    console.log("Borrados categories");
    const documents = categoriesList.map((category) => new Category(category));
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      await document.save();
    }
    console.log("Creados categories correctamente");
  } catch (error) {
    console.error(error);
  }
};

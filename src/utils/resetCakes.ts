// Importamos el modelo
import { Cake, allergensEnum } from "../domain/entities/cake-entity";

// Creamos 50 autores aleatoriamente y los vamos añadiendo al array de autores:
const cakeList = [
  {
    name: "Tarta de Zanahoria",
    ingredients: ["zanahorias", "azúcar", "harina", "huevos", "aceite", "nueces"],
    allergens: [allergensEnum.lactose, allergensEnum.gluten, allergensEnum.nuts],
    description: "Deliciosa tarta de zanahoria cubierta de chocolate.",
    price: 23,
  },
  {
    name: "Tarta de Manzana",
    ingredients: ["manzanas", "azúcar", "harina", "mantequilla", "canela"],
    allergens: [allergensEnum.gluten],
    description: "Una clásica tarta de manzana con un toque casero.",
    price: 18,
  },
  {
    name: "Tarta de Fresa",
    ingredients: ["fresas", "azúcar", "harina", "nata", "gelatina"],
    allergens: [allergensEnum.lactose, allergensEnum.gluten],
    description: "Una exquisita tarta de fresa perfecta para el verano.",
    price: 20,
  },
  {
    name: "Tarta de Chocolate",
    ingredients: ["chocolate", "azúcar", "harina", "mantequilla", "huevos"],
    allergens: [allergensEnum.lactose, allergensEnum.gluten],
    description: "Una irresistible tarta de chocolate para los amantes del cacao.",
    price: 25,
  },
  {
    name: "Tarta de Limón",
    ingredients: ["limones", "azúcar", "harina", "mantequilla", "huevos"],
    allergens: [allergensEnum.lactose, allergensEnum.gluten],
    description: "Una refrescante tarta de limón con un toque ácido.",
    price: 21,
  },
  {
    name: "Tarta de Queso",
    ingredients: ["queso crema", "azúcar", "galletas", "mantequilla", "huevos"],
    allergens: [allergensEnum.lactose, allergensEnum.gluten],
    description: "La clásica tarta de queso con una base de galleta crujiente.",
    price: 22,
  },
  {
    name: "Tarta de Almendras",
    ingredients: ["almendras", "azúcar", "harina", "mantequilla", "huevos"],
    allergens: [allergensEnum.lactose, allergensEnum.nuts, allergensEnum.gluten],
    description: "Una tarta rica en almendras con un sabor único.",
    price: 19,
  },
  {
    name: "Tarta de Frutas",
    ingredients: ["frutas variadas", "azúcar", "harina", "mantequilla", "gelatina"],
    allergens: [allergensEnum.lactose, allergensEnum.gluten],
    description: "Una colorida y deliciosa tarta llena de frutas frescas.",
    price: 24,
  },
  {
    name: "Tarta de Coco",
    ingredients: ["coco rallado", "azúcar", "harina", "leche de coco", "huevos"],
    allergens: [allergensEnum.lactose],
    description: "Una tarta tropical con un toque de coco.",
    price: 17,
  },
  {
    name: "Tarta de Nuez",
    ingredients: ["nueces", "azúcar", "harina", "mantequilla", "huevos"],
    allergens: [allergensEnum.lactose, allergensEnum.nuts],
    description: "Una tarta rústica con un relleno de nueces crujientes.",
    price: 20,
  },
  // Aquí se encuentran las 10 tartas adicionales con ingredientes actualizados
  {
    name: "Tarta de Vainilla",
    ingredients: ["vainilla", "azúcar", "harina", "mantequilla", "huevos"],
    allergens: [allergensEnum.lactose, allergensEnum.gluten],
    description: "Una suave y aromática tarta de vainilla.",
    price: 18,
  },
  {
    name: "Tarta de Café",
    ingredients: ["café", "azúcar", "harina", "mantequilla", "huevos"],
    allergens: [allergensEnum.lactose, allergensEnum.gluten],
    description: "Una deliciosa tarta con el sabor intenso del café.",
    price: 21,
  },
  {
    name: "Tarta de Mora",
    ingredients: ["moras", "azúcar", "harina", "mantequilla", "huevos"],
    allergens: [allergensEnum.lactose, allergensEnum.gluten],
    description: "Una tarta con el dulzor y la acidez de las moras.",
    price: 23,
  },
  {
    name: "Tarta de Maracuyá",
    ingredients: ["maracuyá", "azúcar", "harina", "mantequilla", "huevos"],
    allergens: [allergensEnum.lactose, allergensEnum.gluten],
    description: "Una tarta exótica con el sabor tropical del maracuyá.",
    price: 22,
  },
  {
    name: "Tarta de Pistacho",
    ingredients: ["pistachos", "azúcar", "harina", "mantequilla", "huevos"],
    allergens: [allergensEnum.lactose, allergensEnum.nuts, allergensEnum.gluten],
    description: "Una tarta rica en pistachos para los amantes de los frutos secos.",
    price: 25,
  },
  {
    name: "Tarta de Caramelo",
    ingredients: ["caramelo", "azúcar", "harina", "mantequilla", "huevos"],
    allergens: [allergensEnum.lactose, allergensEnum.gluten],
    description: "Una tarta dulce y cremosa con un toque de caramelo.",
    price: 20,
  },
  {
    name: "Tarta de Piña",
    ingredients: ["piña", "azúcar", "harina", "mantequilla", "huevos"],
    allergens: [allergensEnum.lactose, allergensEnum.gluten],
    description: "Una tarta tropical con jugosos trozos de piña.",
    price: 19,
  },
  {
    name: "Tarta de Arándanos",
    ingredients: ["arándanos", "azúcar", "harina", "mantequilla", "huevos"],
    allergens: [allergensEnum.lactose, allergensEnum.gluten],
    description: "Una tarta con la frescura y el sabor ácido de los arándanos.",
    price: 23,
  },
  {
    name: "Tarta de Dulce de Leche",
    ingredients: ["dulce de leche", "azúcar", "harina", "mantequilla", "huevos"],
    allergens: [allergensEnum.lactose, allergensEnum.gluten],
    description: "Una deliciosa tarta con el sabor cremoso del dulce de leche.",
    price: 22,
  },
];

//  Función de reseteo de documentos de la colección.
export const resetCakes = async (): Promise<void> => {
  try {
    await Cake.collection.drop(); //  Esperamos a que borre los documentos de la colección cake de la BBDD.
    console.log("Borrados cakes");
    const documents = cakeList.map((cake) => new Cake(cake));
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      await document.save();
    }
    console.log("Creados cakes correctamente");
  } catch (error) {
    console.error(error);
  }
};

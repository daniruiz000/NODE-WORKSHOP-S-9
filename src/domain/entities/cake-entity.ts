/**
 * @swagger
 * components:
 *   schemas:
 *     Cake:
 *       type: object
 *       required:
 *         - name
 *         - ingredients
 *         - allergens
 *         - description
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 40
 *         ingredients:
 *           type: string
 *           enum:
 *             - Harina
 *             - Mantequilla
 *             - Azúcar
 *             - Huevos
 *             - Leche
 *             - Crema
 *             - Levadura
 *             - Frutas
 *             - Vainilla
 *             - Ralladura de cítricos
 *             - Especias
 *             - Chocolate
 *             - Nueces
 *             - Almendras
 *         allergens:
 *           type: string
 *           enum:
 *             - Lactosa
 *             - Gluten
 *             - Fructosa
 *             - Frutos secos
 *             - Soja
 *             - Mariscos
 *             - Pescado
 *             - Huevos
 *             - Mostaza
 *             - Sésamo
 *             - Sulfitos
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           minimum: 1
 */

import mongoose from "mongoose";

// Declaramos nuestro esquema que nos permite declarar nuestros objetos y crearle restricciones.
const Schema = mongoose.Schema;
export enum allergensEnum {
  lactose = "Lactosa",
  gluten = "Gluten",
  fructose = "Fructosa",
  nuts = "Frutos secos",
  soy = "Soja",
  shellfish = "Mariscos",
  fish = "Pescado",
  eggs = "Huevos",
  mustard = "Mostaza",
  sesame = "Sésamo",
  sulfites = "Sulfitos",
}

export enum ingredientsEnum {
  HARINA = "Harina",
  MANTEQUILLA = "Mantequilla",
  AZUCAR = "Azúcar",
  HUEVOS = "Huevos",
  LECHE = "Leche",
  CREMA = "Crema",
  LEVADURA = "Levadura",
  FRUTAS = "Frutas",
  VAINILLA = "Vainilla",
  RALLADURA_CITRICOS = "Ralladura de cítricos",
  ESPECIAS = "Especias",
  CHOCOLATE = "Chocolate",
  NUECES = "Nueces",
  ALMENDRAS = "Almendras",
}

// Interface de Cake
export interface ICake {
  name: string;
  ingredients: ingredientsEnum[];
  allergens: allergensEnum[];
  description: string;
  price: number;
}

// Creamos esquema del cake:
const cakeSchema = new Schema<ICake>(
  {
    name: { type: String, trim: true, minLength: [3, " Al menos tres letras para el nombre"], maxLength: [40, "Nombre demasiado largo, máximo de 20 caracteres"], required: true },
    ingredients: {
      type: [String], // Cambiar a tipo string
      enum: Object.values(ingredientsEnum), // Validar los valores del enum
      required: true,
    },
    allergens: {
      type: [String], // Cambiar a tipo string
      enum: Object.values(allergensEnum), // Validar los valores del enum
      required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, min: [0, "Mínimo 0 para precio"] },
  },
  { timestamps: true } // Cada vez que se modifique un documento refleja la hora y fecha de modificación
);

// Creamos un modelo para que siempre que creamos un cake valide contra el Schema que hemos creado para ver si es valido.
export const Cake = mongoose.model<ICake>("Cake", cakeSchema);

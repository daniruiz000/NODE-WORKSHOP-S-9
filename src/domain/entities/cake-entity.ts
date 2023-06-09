/**
 * @swagger
 * components:
 *  schemas:
 *    Cake:
 *      type: object
 *      required:
 *        - name
 *        - ingredient
 *        - allergens
 *        - description
 *        - price
 *      properties:
 *        name:
 *          type: string
 *          description: Nombre de la tarta
 *        ingredient:
 *          type: string
 *          description: Ingredientes que tiene al tarta
 *        allergens:
 *          type: string
 *          description: Alergenos de la tarta
 *        description:
 *          type: string
 *          description: Descripcion de la tarta
 *        price:
 *          type:number
 *          description: Precio de la tarta
 */

import mongoose from "mongoose";

// Declaramos nuestro esquema que nos permite declarar nuestros objetos y crearle restricciones.
const Schema = mongoose.Schema;

export enum allergensEnum {
  Lactosa = "Lactosa",
  Gluten = "Gluten",
  Fructosa = "Fructosa",
  Nuts = "Frutos secos",
  Soja = "Soja",
  Mariscos = "Mariscos",
  Pescado = "Pescado",
  Huevos = "Huevos",
  Mostaza = "Mostaza",
  Sesamo = "Sésamo",
  Sulfitos = "Sulfitos",
};

// Interface de Cake
export interface ICake {
  name: string;
  ingredient: string[];
  allergens: allergensEnum[];
  description: string;
  price: number;
}

// Creamos esquema del cake:
const cakeSchema = new Schema<ICake>(
  {
    name: { type: String, trim: true, minLength: [3, " Al menos tres letras para el nombre"], maxLength: [40, "Nombre demasiado largo, máximo de 20 caracteres"], required: true },
    ingredient: { type: [String], required: true },
    allergens: {
      type: [String], // Cambiar a tipo string
      enum: Object.values(allergensEnum), // Validar los valores del enum
      required: true
    },
    description: { type: String, required: true },
    price: { type: Number, min: [0, "Mínimo 0 para precio"] },
  },
  { timestamps: true } // Cada vez que se modifique un documento refleja la hora y fecha de modificación
);

// Creamos un modelo para que siempre que creamos un cake valide contra el Schema que hemos creado para ver si es valido.
export const Cake = mongoose.model<ICake>("Cake", cakeSchema);

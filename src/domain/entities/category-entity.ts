/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *        - description
 *      properties:
 *        name:
 *          type: string
 *          minLength: 3
 *          maxLength: 22
 *          description: Nombre del u
 *        description:
 *          type: string
 *          minLength: 3
 *          maxLength: 50
 *          description: Descripción de la categoría
 *        cakes:
 *          type: string[]
 *          description: Tartas de la categoría
 */

import mongoose, { ObjectId } from "mongoose";

const Schema = mongoose.Schema;

export interface ICategory {
  name: string;
  description: string;
  cakes?: ObjectId[];
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, trim: true, minLength: [3, "Al menos tres letras para el nombre"], maxLength: [22, "Nombre demasiado largo, máximo de 22 caracteres"], required: true },
    description: { type: String, trim: true, minLength: [3, "Al menos tres letras para la descripción"], maxLength: [50, "Descripción demasiado largo, máximo de 50 caracteres"], required: true },
    cakes: { type: [mongoose.Schema.Types.ObjectId], ref: "Cake", required: false }
  },
  { timestamps: true } // Cada vez que se modifique un documento refleja la hora y fecha de modificación
);

// Creamos un modelo para que siempre que creamos un category valide contra el Schema que hemos creado para ver si es valido.
export const Category = mongoose.model<ICategory>("Category", categorySchema);

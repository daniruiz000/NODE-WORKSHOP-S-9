/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - name
 *        - country
 *        - image
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          description: Email del autor
 *        password:
 *          type: string
 *          minLength: 8
 *          description: Contraseña del autor
 *        name:
 *          type: string
 *          minLength: 3
 *          maxLength: 22
 *          description: Nombre del autor
 *        country:
 *          type: string
 *          enum:
 *            - SPAIN
 *            - COLOMBIA
 *            - ENGLAND
 *            - RUSSIA
 *            - UNITED STATES
 *            - ARGENTINA
 *            - CZECHOSLOVAKIA
 *            - JAPAN
 *            - NIGERIA
 *          description: País del autor
 *        image:
 *          type: string
 *          description: URL de la imagen del autor
 */

import mongoose from "mongoose";

import { ICake } from "./cake-entity";

const Schema = mongoose.Schema;

export interface ICategory {
  name: string;
  description: string;
  cakes?: ICake[];
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, trim: true, minLength: [3, "Al menos tres letras para el nombre"], maxLength: [22, "Nombre demasiado largo, máximo de 22 caracteres"], required: true },
    description: { type: String, trim: true, minLength: [3, "Al menos tres letras para la descripción"], maxLength: [20, "Descripción demasiado largo, máximo de 20 caracteres"], required: true },
    cakes: { type: mongoose.Types.Array, ref: ICake, required: false }
  },
  { timestamps: true } // Cada vez que se modifique un documento refleja la hora y fecha de modificación
);

// Creamos un modelo para que siempre que creamos un category valide contra el Schema que hemos creado para ver si es valido.
export const Category = mongoose.model<ICategory>("Category", categorySchema);

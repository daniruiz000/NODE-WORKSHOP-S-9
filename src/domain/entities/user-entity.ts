/**
 * @swagger
 * components:
 *  schemas:
 *    User:
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

import mongoose, { ObjectId } from "mongoose";

import validator from "validator";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export interface IUser {
  email: string;
  password: string;
  name: string;
  orders?: ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      trim: true,
      unique: true, // indica que no puede haber otra entidad con esta propiedad que tenga el mismo valor.
      validate: {
        validator: (text: string) => validator.isEmail, // Validamos haciendo uso de la librería validator y la función isEmail que incorpora.
        message: "Email incorrecto"
      },
      required: true
    },
    password: {
      type: String,
      trim: true,
      unique: true,
      minLength: [8, "La contraseña debe tener al menos 8 caracteres"],
      select: false, // Indica que no lo deseamos mostrar cuando se realicen las peticiones.
      required: true
    },
    name: { type: String, trim: true, minLength: [3, "Al menos tres letras para el nombre"], maxLength: [22, "Nombre demasiado largo, máximo de 22 caracteres"], required: true },
    orders: { type: [mongoose.Schema.Types.ObjectId], ref: "Order", required: false }
  },
  { timestamps: true } // Cada vez que se modifique un documento refleja la hora y fecha de modificación
);

// Cada vez que se guarde un usuario encriptamos la contraseña
userSchema.pre("save", async function (next) {
  try {
    // Si la password estaba encriptada, no la encriptaremos de nuevo.
    if (this.isModified("password")) {
      // Si el campo password se ha modificado
      const saltRounds = 10;
      const passwordEncrypted = await bcrypt.hash(this.password, saltRounds); // Encriptamos la contraseña
      this.password = passwordEncrypted; // guardamos la password en la entidad User
      next();
    }
  } catch (error) {
    next();
  }
});

// Creamos un modelo para que siempre que creamos un user valide contra el Schema que hemos creado para ver si es valido.
export const User = mongoose.model<IUser>("User", userSchema);

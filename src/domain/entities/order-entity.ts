/**
 * @swagger
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      required:
 *        - address
 *        - date
 *        - status
 *        - user
 *        - cakes
 *      properties:
 *        address:
 *          type: string
 *          minLength: 3
 *          maxLength: 100
 *          description: Dirección de la entrega
 *        date:
 *          type: date
 *          description: Fecha del pedido
 *        status:
 *          type: string
 *          enum:
 *            - PENDING
 *            - PAID
 *            - SENT
 *            - DELIVERED
 *          description: Estado del pedido
 *        user:
 *          type: string
 *          description: ID del usuario que ha realizado el pedido
 *        cakes:
 *          type: string[]
 *          description: Tartas añadidas al pedido
 */

import mongoose, { ObjectId } from "mongoose";

const Schema = mongoose.Schema;

export enum AllowedStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  SENT = "SENT",
  DELIVERED = "DELIVERED",
}

export interface IOrder {
  status: AllowedStatus;
  date: Date;
  address: string;
  user: ObjectId;
  cakes: ObjectId;
}

const orderSchema = new Schema<IOrder>(
  {
    address: {
      type: String,
      trim: true,
      minLength: [3, "Al menos tres letras para la dirección"],
      maxLength: [100, "Dirección demasiada larga, máximo de 100 caracteres"],
      required: true,
    },
    status: {
      type: String,
      trim: true,
      enum: AllowedStatus,
      uppercase: true,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cakes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Cake",
      required: true,
    },
  },
  { timestamps: true } // Cada vez que se modifique un documento refleja la hora y fecha de modificación
);

// Creamos un modelo para que siempre que creamos un order valide contra el Schema que hemos creado para ver si es valido.
export const Order = mongoose.model<IOrder>("Order", orderSchema);

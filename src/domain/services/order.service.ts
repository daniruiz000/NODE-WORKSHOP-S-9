import { Response, NextFunction } from "express";
import { orderOdm } from "../odm/order.odm";
import { AllowedStatus } from "../entities/order-entity";
import { ICake } from "../entities/cake-entity";

export const getOrdersByUser = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id;

    if (req.user.id !== userId && req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }

    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const orders = await orderOdm.getAllOrdersByUser(userId, page, limit);

    const totalElements = await orderOdm.getOrderCount();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: orders,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }

    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const orders = await orderOdm.getAllOrders(page, limit);

    const totalElements = await orderOdm.getOrderCount();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: orders,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const order = await orderOdm.getOrderById(id);

    if (order) {
      const temporalOrder = order.toObject();
      if (req.user.id !== temporalOrder.user && req.user.email !== "admin@gmail.com") {
        res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      } else {
        res.status(200).json(temporalOrder);
      }
    } else {
      res.status(404).json({ error: "Pedido no encontrado." });
    }
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;

    if (req.user.id !== id && req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }
    const temporalOrder = {
      cakes: req.body.cakes,
      status: "CART",
      date: new Date(),
      user: req.user.id,
    };
    const createdOrder = await orderOdm.createOrder(temporalOrder);
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;

    if (req.user.id !== id && req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }

    const orderDeleted = await orderOdm.deleteOrder(id);
    if (orderDeleted) {
      res.json(orderDeleted);
    } else {
      res.status(404).json({ error: "Pedido no encontrado." });
    }
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;

    const orderToUpdate = await orderOdm.getOrderById(id);
    if (!orderToUpdate) {
      res.status(404).json({ error: "Pedido no encontrado." });
      return;
    }
    const address: string = req.body.address;
    const cakes: ICake[] = req.body.cakes;
    const status: AllowedStatus = req.body.status;

    if (req.user.id !== orderToUpdate.toObject().user && req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }

    if (req.user.email === "admin@gmail.com") {
      Object.assign(orderToUpdate, {
        status,
        address,
        cakes,
        date: orderToUpdate.toObject().status !== status && status === AllowedStatus.PENDING ? new Date() : orderToUpdate.toObject().date,
      });
    } else {
      if (orderToUpdate.toObject().status !== AllowedStatus.CART || (status !== AllowedStatus.PENDING && status !== AllowedStatus.CART)) {
        res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
        return;
      }
      if (!cakes.length && status === AllowedStatus.PENDING) {
        res.status(400).json({ error: "No hay tartas en el pedido, melón!" });
        return;
      }
      Object.assign(orderToUpdate, {
        status,
        address,
        cakes,
        date: orderToUpdate.toObject().status !== status && status === AllowedStatus.PENDING ? new Date() : orderToUpdate.toObject().date,
      });
    }

    await orderToUpdate.save();
    res.json(orderToUpdate);
  } catch (error) {
    next(error);
  }
};

export const orderService = {
  getOrdersByUser,
  getOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  updateOrder,
};

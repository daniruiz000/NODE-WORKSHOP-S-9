import { Response, NextFunction } from "express";
import { orderOdm } from "../odm/order.odm";

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

    if (req.order.id !== id && req.order.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }
    const createdOrder = await orderOdm.createOrder(req.body);
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;

    if (req.order.id !== id && req.order.email !== "admin@gmail.com") {
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

    if (req.order.id !== id && req.order.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }

    const orderToUpdate = await orderOdm.getOrderById(id);
    if (orderToUpdate) {
      Object.assign(orderToUpdate, req.body);
      await orderToUpdate.save();
      const orderToSend: any = orderToUpdate.toObject();
      res.json(orderToSend);
    } else {
      res.status(404).json({ error: "Pedido no encontrado." });
    }
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

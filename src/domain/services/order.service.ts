import { type Request, type Response, type NextFunction } from "express";
import { orderOdm } from "../odm/order.odm";
import { Book } from "../entities/book-entity";

export const getOrdersByUser = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;

    if (req.user.id !== id && req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }

    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const orders = await orderOdm.getAllOrdersByUser(id, page, limit);

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
    const id = req.params.id;

    if (req.user.id !== id && req.user.email !== "admin@gmail.com") {
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

export const getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const order = await orderOdm.getOrderById(id);

    if (order) {
      const temporalOrder = order.toObject();
      const includeBooks = req.query.includeBooks === "true";
      if (includeBooks) {
        const books = await Book.find({ order: id });
        temporalOrder.books = books;
      }

      res.json(temporalOrder);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
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
      res.status(404).json({});
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
      // Quitamos pass de la respuesta
      const orderToSend: any = orderToUpdate.toObject();
      delete orderToSend.password;
      res.json(orderToSend);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

export const orderService = {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  updateOrder,
};

import { type NextFunction, type Request, type Response } from "express";
import { cakeOdm } from "../odm/cake.odm";

const getAllCakes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = req.query.page as any;
    const limit = req.query.limit as any;

    const cakes = await cakeOdm.getAllCakes(page, limit);

    const totalElements = await cakeOdm.getCakeCount();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: cakes,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getCakeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const cake = await cakeOdm.getCakeById(id);
    if (cake) {
      res.json(cake);
    } else {
      res.status(404).json({ error: "Cake not found" });
    }
  } catch (error) {
    next(error);
  }
};

const createCake = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }
    const createdCake = await cakeOdm.createCake(req.body);
    res.status(201).json(createdCake);
  } catch (error) {
    next(error);
  }
};

const deleteCake = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    if (req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }
    const cakeDeleted = await cakeOdm.deleteCake(id);
    if (cakeDeleted) {
      res.json(cakeDeleted);
    } else {
      res.status(404).json({ error: "Cake was not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateCake = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    if (req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }
    const cakeUpdated = await cakeOdm.updateCake(id, req.body);
    if (cakeUpdated) {
      res.json(cakeUpdated);
    } else {
      res.status(404).json({ error: "Cake was not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const cakeService = {
  getAllCakes,
  getCakeById,
  createCake,
  deleteCake,
  updateCake,
};

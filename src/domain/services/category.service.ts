import { type NextFunction, type Request, type Response } from "express";
import { categoryOdm } from "../odm/category.odm";

const getAllCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = req.query.page as any;
    const limit = req.query.limit as any;

    const categories = await categoryOdm.getAllCategories(page, limit);

    const totalElements = await categoryOdm.getCategoryCount();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: categories,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getCategoryByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const name = req.params.name;

  try {
    const category = await categoryOdm.getCategoryByName(name);
    if (category?.length) {
      res.json(category);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const category = await categoryOdm.getCategoryById(id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }
    const createdCategory = await categoryOdm.createCategory(req.body);
    res.status(201).json(createdCategory);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;

    if (req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }
    const categoryDeleted = await categoryOdm.deleteCategory(id);
    if (categoryDeleted) {
      res.json(categoryDeleted);
    } else {
      res.status(404).json({ error: "Category was not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    if (req.user.email !== "admin@gmail.com") {
      res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
      return;
    }
    const categoryUpdated = await categoryOdm.updateCategory(id, req.body);
    if (categoryUpdated) {
      res.json(categoryUpdated);
    } else {
      res.status(404).json({ error: "Category was not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const categoryService = {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryByName,
};

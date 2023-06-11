import { Category, ICategory } from "../entities/category-entity";
import { Document } from "mongoose";

const getAllCategories = async (page: number, limit: number): Promise<any> => {
  return await Category.find()
    .limit(limit)
    .skip((page - 1) * limit);
};

const getCategoryCount = async (): Promise<number> => {
  return await Category.countDocuments();
};

const getCategoryById = async (id: string): Promise<Document<ICategory> | null> => {
  return await Category.findById(id).populate("cakes");
};

const getCategoryByName = async (name: string): Promise<Document<ICategory>[]> => {
  return await Category.find({ name: new RegExp("^" + name.toLowerCase(), "i") }).populate("cakes");
};

const createCategory = async (categoryData: any): Promise<Document<ICategory>> => {
  const category = new Category(categoryData);
  const document: Document<ICategory> = (await category.save()) as any;

  return document;
};

const deleteCategory = async (id: string): Promise<Document<ICategory> | null> => {
  return await Category.findByIdAndDelete(id);
};

const updateCategory = async (id: string, categoryData: any): Promise<Document<ICategory> | null> => {
  return await Category.findByIdAndUpdate(id, categoryData, { new: true, runValidators: true });
};

export const categoryOdm = {
  getAllCategories,
  getCategoryCount,
  getCategoryById,
  getCategoryByName,
  createCategory,
  deleteCategory,
  updateCategory,
};

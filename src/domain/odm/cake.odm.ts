import { Cake, ICake } from "../entities/cake-entity";
import { Document } from "mongoose";

const getAllCakes = async (page: number, limit: number): Promise<any> => {
  return await Cake.find()
    .limit(limit)
    .skip((page - 1) * limit);
};

const getCakeCount = async (): Promise<number> => {
  return await Cake.countDocuments();
};

const getCakeById = async (id: string): Promise<Document<ICake> | null> => {
  return await Cake.findById(id);
};

const createCake = async (cakeData: any): Promise<Document<ICake>> => {
  const cake = new Cake(cakeData);
  const document: Document<ICake> = (await cake.save()) as any;

  return document;
};

const deleteCake = async (id: string): Promise<Document<ICake> | null> => {
  return await Cake.findByIdAndDelete(id);
};

const updateCake = async (id: string, cakeData: any): Promise<Document<ICake> | null> => {
  return await Cake.findByIdAndUpdate(id, cakeData, { new: true, runValidators: true });
};

export const cakeOdm = {
  getAllCakes,
  getCakeCount,
  getCakeById,
  createCake,
  deleteCake,
  updateCake,
};

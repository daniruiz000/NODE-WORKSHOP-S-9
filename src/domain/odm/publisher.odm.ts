import { Publisher, IPublisher } from "../entities/publisher-entity";
import { Document } from "mongoose";

const getAllPublishers = async (page: number, limit: number): Promise<any> => {
  return await Publisher.find()
    .limit(limit)
    .skip((page - 1) * limit);
};

const getPublisherCount = async (): Promise<number> => {
  return await Publisher.countDocuments();
};

const getPublisherById = async (id: string): Promise<Document<IPublisher> | null> => {
  return await Publisher.findById(id);
};

const getPublisherByName = async (name: string): Promise<Document<IPublisher>[]> => {
  return await Publisher.find({ name: new RegExp("^" + name.toLowerCase(), "i") });
};

const createPublisher = async (publisherData: any): Promise<Document<IPublisher>> => {
  const publisher = new Publisher(publisherData);
  const document: Document<IPublisher> = (await publisher.save()) as any;

  return document;
};

const deletePublisher = async (id: string): Promise<Document<IPublisher> | null> => {
  return await Publisher.findByIdAndDelete(id);
};

const updatePublisher = async (id: string, publisherData: any): Promise<Document<IPublisher> | null> => {
  return await Publisher.findByIdAndUpdate(id, publisherData, { new: true, runValidators: true });
};

export const publisherOdm = {
  getAllPublishers,
  getPublisherCount,
  getPublisherById,
  getPublisherByName,
  createPublisher,
  deletePublisher,
  updatePublisher,
};

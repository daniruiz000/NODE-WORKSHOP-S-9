import { Order, IOrder } from "../entities/order-entity";
import { Document } from "mongoose";

const getAllOrdersByUser = async (id: string, page: number, limit: number): Promise<any> => {
  return await Order.find({ user: id })
    .populate("user", "cakes")
    .limit(limit)
    .skip((page - 1) * limit);
};

const getAllOrders = async (page: number, limit: number): Promise<any> => {
  return await Order.find()
    .limit(limit)
    .skip((page - 1) * limit);
};

const getOrderCount = async (): Promise<number> => {
  return await Order.countDocuments();
};

const getOrderById = async (id: string): Promise<Document<IOrder> | null> => {
  return await Order.findById(id).populate("user", "cakes");
};

const createOrder = async (orderData: any): Promise<Document<IOrder>> => {
  const order = new Order(orderData);
  const document: Document<IOrder> = (await order.save()) as any;

  return document;
};

const deleteOrder = async (id: string): Promise<Document<IOrder> | null> => {
  return await Order.findByIdAndDelete(id);
};

const updateOrder = async (id: string, orderData: any): Promise<Document<IOrder> | null> => {
  return await Order.findByIdAndUpdate(id, orderData, { new: true, runValidators: true });
};

export const orderOdm = {
  getAllOrdersByUser,
  getAllOrders,
  getOrderCount,
  getOrderById,
  createOrder,
  deleteOrder,
  updateOrder,
};

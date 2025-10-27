import axiosInstance from "./axiosInstance";
import { Order } from "../types/order";

const API_URL = "/orders";

export const getOrders = async (): Promise<Order[]> => {
  const res = await axiosInstance.get(API_URL);
  return res.data.data;
};

export const getOrderById = async (id: string): Promise<Order> => {
  const res = await axiosInstance.get(`${API_URL}/${id}`);
  return res.data;
};

export const createOrder = async (order: Order): Promise<Order> => {
  const res = await axiosInstance.post(API_URL, order);
  return res.data.data;
};

export const updateOrder = async (id: string, order: Partial<Order>): Promise<Order> => {
  const res = await axiosInstance.put(`${API_URL}/${id}`, order);
  return res.data.data;
};

export const deleteOrder = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${API_URL}/${id}`);
};

import axiosInstance from "./axiosInstance";
import { Product } from "../types/product";

const API_URL = "/items"; // your backend route

export const getProducts = async (): Promise<Product[]> => {
  const res = await axiosInstance.get(API_URL);
  return res.data.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const res = await axiosInstance.post(API_URL, product);
  return res.data.data;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const res = await axiosInstance.put(`${API_URL}/${id}`, product);
  return res.data.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${API_URL}/${id}`);
};

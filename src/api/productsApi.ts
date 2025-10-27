import axios from "axios";
import { Product } from "../types/product";

const API_URL = "http://localhost:4000/api/items"; // your backend route

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get(API_URL);
  return res.data.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const res = await axios.post(API_URL, product);
  return res.data.data;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const res = await axios.put(`${API_URL}/${id}`, product);
  return res.data.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

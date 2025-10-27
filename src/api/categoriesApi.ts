import axios from "axios";
import { Category } from "../types/category";

const API_URL = "http://localhost:4000/api/categories";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get(API_URL);
  return res.data.data;
};

export const createCategory = async (category: Category): Promise<Category> => {
  const res = await axios.post(API_URL, category);
  return res.data.data;
};

export const updateCategory = async (id: string, category: Partial<Category>): Promise<Category> => {
  const res = await axios.put(`${API_URL}/${id}`, category);
  return res.data.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

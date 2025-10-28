import axiosInstance from "./axiosInstance";
import { Category } from "../types/category";

const API_URL = "/categories";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axiosInstance.get(API_URL);
  return res.data.data;
};

export const createCategory = async (category: Category): Promise<Category> => {
  const res = await axiosInstance.post(API_URL, category);
  return res.data.data;
};

export const updateCategory = async (id: string, category: Partial<Category>): Promise<Category> => {
  const res = await axiosInstance.put(`${API_URL}/${id}`, category);
  return res.data.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${API_URL}/${id}`);
};

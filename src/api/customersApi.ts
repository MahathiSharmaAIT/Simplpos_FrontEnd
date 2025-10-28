import axiosInstance from "./axiosInstance";
import { Customer } from "../types/customer";

const API_URL = "/customers";


// ✅ Get all customers
export const getCustomers = async (): Promise<Customer[]> => {
  const res = await axiosInstance.get(API_URL);
  return res.data.data;
};

// ✅ Get single customer
export const getCustomerById = async (id: string): Promise<Customer> => {
  const res = await axiosInstance.get(`${API_URL}/${id}`);
  return res.data.data;
};

// ✅ Create customer
export const createCustomer = async (customer: Customer): Promise<Customer> => {
  const res = await axiosInstance.post(API_URL, customer);
  return res.data.data;
};

// ✅ Update customer
export const updateCustomer = async (id: string, customer: Partial<Customer>): Promise<Customer> => {
  const res = await axiosInstance.put(`${API_URL}/${id}`, customer);
  return res.data.data;
};

// ✅ Delete customer
export const deleteCustomer = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${API_URL}/${id}`);
};

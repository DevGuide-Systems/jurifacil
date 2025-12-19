import api from "../apiConfig";
import { Customer } from "@/types/customer";

export async function getCustomers(): Promise<Customer[]> {
  const response = await api.get("/customers");
  return response.data.data;
}

export async function getCustomerById(id: string): Promise<Customer> {
  const response = await api.get(`/customers/${id}`);
  return response.data;
}

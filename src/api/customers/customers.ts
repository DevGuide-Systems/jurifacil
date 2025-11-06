import api from "../apiConfig";

export interface Customer {
  id: string;
  name: string;
  indentification: string;
  document: string;
  cellphone: string;
  gender: string;
  civil_status: string;
  phone: string;
  email: string;
  occupation: string;
  street: string;
  postalcode: string;
  region: string;
  city: string;
  state: string;
  country: string;
  birthdate: string;
  number_ctps: string;
  number_pis: string;
  number_cid: string;
  notes: string;
  origin: string;
  created_at: string;
}

export async function getCustomers(): Promise<Customer[]> {
  const response = await api.get("/customers");
  return response.data.data;
}

export async function getCustomerById(id: string): Promise<Customer> {
  const response = await api.get(`/customers/${id}`);
  return response.data;
}

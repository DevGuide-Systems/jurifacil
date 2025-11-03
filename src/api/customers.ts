import api from "./api";

export interface Customer {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  indentification: string;
  address: {
    street: string;
    postalcode: string;
    region: string;
    city: string;
    state: string;
  };
}

export async function getCustomers(): Promise<Customer[]> {
  const response = await api.get("/customers");
  return response.data.data;
}

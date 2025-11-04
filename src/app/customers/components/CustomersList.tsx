"use client";

import { useRouter } from "next/navigation";
import { Customer } from "@/api/customers";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "../../../components/ui/input";

interface CustomersListProps {
  customers: Customer[];
}

export default function CustomersList({ customers }: CustomersListProps) {
  const [search, setSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  const router = useRouter();

  function handleGenerateContract(customerId: string) {
    router.push(`/customers/${customerId}`);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(value)
    );
    setFilteredCustomers(filtered);
  }

  return (
    <div>
      <ul className="space-y-2 md:mx-20 lg:mx-60">
        <Input
          type="search"
          placeholder="Buscar cliente..."
          value={search}
          onChange={handleSearch}
        />
        {filteredCustomers.map((customer) => (
          <li
            key={customer.id}
            className="border rounded-lg p-3 hover:bg-gray-50 transition flex flex-col gap-5 min-[480px]:flex-row items-center justify-between"
          >
            <div className="w-full flex flex-col items-center min-[480px]:items-start">
              <p className="font-bold text-[12px] text-[var(--blue-primary)]">
                {customer.name}
              </p>

              {customer.email ? (
                <p className="text-[12px] text-[var(--gray-200)]">
                  {customer.email}
                </p>
              ) : (
                <p className="text-[12px] text-[var(--danger-secondary)]">
                  E-mail não cadastrado no sistema
                </p>
              )}

              {customer.cellphone ? (
                <p className="text-[12px] text-[var(--gray-200)]">
                  {customer.cellphone}
                </p>
              ) : (
                <p className="text-[12px] text-[var(--danger-secondary)]">
                  Telefone não cadastrado sistema
                </p>
              )}

              {customer.street ? (
                <p className="text-[12px] text-[var(--gray-200)]">
                  {customer.street}
                </p>
              ) : (
                <p className="text-[12px] text-[var(--danger-secondary)]">
                  Endereço não cadastrado sistema
                </p>
              )}
            </div>

            <div>
              <Button
                className="cursor-pointer bg-[var(--blue-secondary)]  hover:bg-[var(--blue-primary)]"
                onClick={() => handleGenerateContract(customer.id)}
              >
                Gerar Contrato
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

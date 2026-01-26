"use client";

import { Customer } from "@/types/customer";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LawsuitsList from "@/components/lawsuits-list";

interface CustomersListProps {
  customers: Customer[];
}

export default function CustomersList({ customers }: CustomersListProps) {
  const [search, setSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(value),
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
            className="border rounded-lg p-3 hover:bg-gray-50 transition flex flex-col w-full gap-5 min-[480px]:flex-row"
          >
            <Accordion type="multiple" className="flex w-full">
              <AccordionItem
                value="item-1"
                className="flex flex-col w-full font-bold text-[12px] text-[var(--blue-primary)]"
              >
                <AccordionTrigger className="cursor-pointer ">
                  {customer.name}
                </AccordionTrigger>
                <AccordionContent>
                  <LawsuitsList customerId={customer.id} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        ))}
      </ul>
    </div>
  );
}

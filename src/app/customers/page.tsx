import { getCustomers } from "@/api/customers/customers";
import CustomersList from "./_components/customers-list";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <main className="flex flex-col p-5 gap-6">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl text-[var(--blue-primary)]">
          Clientes Cadastrados
        </h1>
        <p className="font-light text-[12px] text-[var(--blue-secondary)] sm:text-[14px]">
          Lista de clientes cadastrados no sistema ADVBOX
        </p>
      </div>
      <CustomersList customers={customers} />
    </main>
  );
}

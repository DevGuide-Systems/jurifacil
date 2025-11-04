import { getCustomerById } from "@/api/customers";

interface CustomerPageProps {
  params: { id: string };
}

export default async function CustomerPage({ params }: CustomerPageProps) {
  const { id } = await params;
  const customer = await getCustomerById(id);

  return (
    <main className="flex flex-col p-5 gap-6">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-[12px] text-[var(--blue-secondary)] sm:text-[20px]">
          Gerar contrato para:
        </h1>
        <p className="font-bold text-xl text-[var(--blue-primary)]">
          {customer.name}
        </p>
      </div>
    </main>
  );
}

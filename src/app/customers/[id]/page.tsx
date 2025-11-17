import { getCustomerById } from "@/api/customers/customers";
import ContractSelector from "@/app/customers/[id]/_components/contract-selector";
import BackButton from "@/components/back-button";
import { ArrowLeft } from "lucide-react";
interface CustomerPageProps {
  params: { id: string };
}

export default async function CustomerPage({ params }: CustomerPageProps) {
  const { id } = await params;
  const customer = await getCustomerById(id);

  return (
    <>
      <div className="mx-5 min-[768px]:mx-10">
        <BackButton text="voltar" icon={ArrowLeft} />
      </div>
      <main className="flex flex-col p-5 gap-6">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-[12px] text-[var(--blue-secondary)] sm:text-[20px]">
            Gerar Contratos para:
          </h1>
          <p className="font-bold text-xl text-[var(--blue-primary)]">
            {customer.name}
          </p>
          <p className="font-light text-[12px] text-[var(--blue-secondary)] sm:text-[14px]">
            Selecione os modelos a serem gerados:
          </p>
        </div>
        <ContractSelector customerId={id} />
      </main>
    </>
  );
}

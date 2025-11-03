import { getCustomers } from "@/api/customers";
import { Button } from "@/components/ui/button";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <main className="flex flex-col p-5 gap-6">
      <div className=" flex flex-col items-start sm:items-center">
        <h1 className="font-bold text-2xl text-[var(--blue-primary)]">
          Clientes Cadastrados
        </h1>
        <p className="font-light text-[var(--blue-secondary)]">
          Lista de clientes cadastrados no sistema ADVBOX
        </p>
      </div>

      <ul className="space-y-2 md:mx-20 lg:mx-60">
        {customers.map((customers) => (
          <li
            key={customers.id}
            className="border rounded-lg p-3 hover:bg-gray-50 transition flex flex-row items-center justify-between"
          >
            <div>
              <p className="font-bold text-[14px] text-[var(--blue-primary)]">
                {customers.name}
              </p>

              {customers.email ? (
                <p className="text-[12px] text-[var(--gray-200)]">
                  {customers.email}
                </p>
              ) : (
                <p className="text-[12px] text-[var(--danger-secondary)]">
                  E-mail não cadastrado no sistema
                </p>
              )}

              {customers.cellphone ? (
                <p className="text-[12px] text-[var(--gray-200)]">
                  {customers.cellphone}
                </p>
              ) : (
                <p className="text-[12px] text-[var(--danger-secondary)]">
                  Telefone não cadastrado sistema
                </p>
              )}
            </div>

            <div>
              <Button className="cursor-pointer bg-[var(--blue-secondary)]  hover:bg-[var(--blue-primary)]">Gerar Contrato</Button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

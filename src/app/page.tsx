import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center mt-60 p-6 gap-2">
      <h1 className="font-bold text-2xl text-[var(--blue-primary)]">Bem-vindo ao <span className="text-[var(--blue-secondary)]">JuriFácil</span></h1>
      <p className="font-bold text-[12px] text-[var(--blue-secondary)] sm:text-[14px]">
        Gere contratos de forma rápida e eficiente.
      </p>
      <Button className="cursor-pointer bg-[var(--blue-secondary)]  hover:bg-[var(--blue-primary)]">
        <Link href="/customers">Gerar Contratos</Link>{" "}
      </Button>
    </div>
  );
}

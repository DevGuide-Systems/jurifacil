import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="h-full flex flex-col items-center p-6 gap-2">
      <h1 className="font-bold text-2xl text-[var(--blue-primary)]">
        Bem-vindo ao <span className="text-[var(--blue-secondary)]">JuriFácil</span>
      </h1>
      <p className="font-bold text-[12px] text-[var(--blue-secondary)] sm:text-[14px]">
        Gere documentos de forma rápida e eficiente.
      </p>
    </div>
  );
}

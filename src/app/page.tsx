import LoginForm from "@/components/auth/login-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/customers");
  }
  return (
    <div className="h-full flex flex-col items-center p-6 gap-15">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl text-[var(--blue-primary)]">
          Bem-vindo ao{" "}
          <span className="text-[var(--blue-secondary)]">JuriFácil</span>
        </h1>
        <p className="font-bold text-[12px] text-[var(--blue-secondary)] sm:text-[14px]">
          Gere documentos de forma rápida e eficiente.
        </p>
      </div>
      <div className="border-solid border-1 border-[var(--gray-100)] rounded-lg w-[27rem]">
        <LoginForm />
      </div>
    </div>
  );
}

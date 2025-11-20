"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import logo from "../../../public/google-icon.svg";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  loginSchemaData,
} from "@/lib/validations/auth/login.schema";
import { OAuthStrategy } from "@clerk/types";
import { useSignIn } from "@clerk/nextjs";

export default function LoginForm() {
  const { signIn } = useSignIn();
  const { register, handleSubmit, formState } = useForm<loginSchemaData>({
    resolver: zodResolver(loginSchema),
  });

  if (!signIn) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/customers",
    });
  };

  function handleLogin(data: loginSchemaData) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col gap-5 px-10 py-10"
    >
      <div className="flex flex-col gap-3">
        <label
          htmlFor="email"
          className="text-sm text-[var(--blue-primary)] font-bold"
        >
          E-mail
        </label>
        <Input
          id="email"
          type="email"
          placeholder="E-mail do usuário"
          {...register("email")}
        />
        {formState.errors.email && (
          <p className="text-[var(--danger-secondary)]">
            {formState.errors.email.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <label
          htmlFor="password"
          className="text-sm text-[var(--blue-primary)] font-bold"
        >
          Senha
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Senha do usuário"
          {...register("password")}
        />
        {formState.errors.password && (
          <p className="text-[var(--danger-secondary)]">
            {formState.errors.password.message}
          </p>
        )}
      </div>
      <Link
        href="/reset-password"
        className="text-sm text-[var(--blue-secondary)]"
      >
        Esqueceu a senha?
      </Link>
      <Button
        type="submit"
        className="cursor-pointer bg-[var(--blue-secondary)] hover:bg-[var(--blue-primary)]"
      >
        Entrar
      </Button>
      <div className="flex flex-row items-center gap-2">
        <hr className="flex-grow border-1 border-gray-300" />
        <p className="text-sm text-[var(--gray-200)]">ou</p>
        <hr className="flex-grow border-1 border-gray-300" />
      </div>
      <Button
        type="button"
        onClick={() => signInWith("oauth_google")}
        className="cursor-pointer bg-[var(--gray-100)] hover:bg-gray-300 font-bold text-[var(--blue-primary)]"
      >
        <Image src={logo} alt="Google Logo Icon" />
        Entrar com o Google
      </Button>
      <p className="text-sm text-[var(--gray-200)]">
        Não tem uma conta?{" "}
        <Link href="/sign-up" className="text-sm text-[var(--blue-secondary)]">
          Criar Conta.
        </Link>
      </p>
    </form>
  );
}

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <>
      <h1>Página de cadastro</h1>
      <SignUp />
    </>
  );
}

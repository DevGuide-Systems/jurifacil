import { Button } from "../ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function LoginButton() {
  return (
    <SignInButton>
      <Button className="cursor-pointer bg-[var(--blue-secondary)]  hover:bg-[var(--blue-primary)]">
        Login com Google
      </Button>
    </SignInButton>
  );
}

import { Button } from "../ui/button";
import { SignOutButton } from "@clerk/nextjs";

export default function LogoutButton() {
  function handleClick() {}
  return (
    <SignOutButton>
      <Button className="cursor-pointer bg-[var(--blue-secondary)]  hover:bg-[var(--blue-primary)]">
        Desconectar-se
      </Button>
    </SignOutButton>
  );
}

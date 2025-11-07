"use client";

import { Button } from "../ui/button";

export default function LoginButton() {
  return (
    <Button className="cursor-pointer bg-[var(--blue-secondary)]  hover:bg-[var(--blue-primary)]">
      Login com Google
    </Button>
  );
}

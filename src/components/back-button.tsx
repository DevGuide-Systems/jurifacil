import { ElementType } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface BackButtonProps {
  text: string;
  page: string;
  icon: ElementType;
}

export default function BackButton({ text, icon: Icon, page }: BackButtonProps) {
  return (
    <Button className="cursor-pointer bg-[var(--blue-secondary)]  hover:bg-[var(--blue-primary)]">
      <Icon />
      <Link href={page}>{text}</Link>
    </Button>
  );
}

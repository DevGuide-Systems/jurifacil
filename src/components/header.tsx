import { ElementType } from "react";
import Image, { StaticImageData } from "next/image";
import UserMenu from "./auth/user-menu";
interface HeaderProps {
  text: string;
  icon: ElementType;
}

export default async function Header({ icon: Icon, text }: HeaderProps) {
  return (
    <header className="flex flex-row justify-between items-center py-5 px-7 min-[768px]:px-15 border-solid border-1">
      <div className="flex flex-row gap-5 text-[var(--blue-secondary)] font-bold items-center">
        <Icon />
        {text}
      </div>

      <div className="flex flex-row gap-5 items-center justify-center">
        <div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

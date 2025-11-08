import { ElementType } from "react";
import Image, { StaticImageData } from "next/image";
import { auth } from "@clerk/nextjs/server";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";

interface HeaderProps {
  text: string;
  icon: ElementType;
  image: StaticImageData;
}

export default async function Header({ icon: Icon, text, image }: HeaderProps) {
  const { userId } = await auth();

  return (
    <header className="flex flex-row justify-between items-center py-5 px-7 min-[768px]:px-15">
      <div className="">
        <Image src={image} alt={text} width={50} height={50} />
      </div>
      <div className="flex flex-row gap-5 text-[var(--blue-secondary)] font-bold items-center">
        <Icon />
        {text}
        {userId ? <LogoutButton /> : <LoginButton />}
      </div>
    </header>
  );
}

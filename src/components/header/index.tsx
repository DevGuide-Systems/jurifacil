import { ElementType } from "react";
import Image, { StaticImageData } from "next/image";
import LoginButton from "../LoginButton";

interface HeaderProps {
  text: string;
  icon: ElementType;
  image: StaticImageData;
}

export default function Header({ icon: Icon, text, image }: HeaderProps) {
  return (
    <header className="flex flex-row justify-between items-center py-5 px-7 min-[768px]:px-15">
      <div className="">
        <Image src={image} alt={text} width={50} height={50} />
      </div>
      <div className="flex flex-row gap-5 text-[var(--blue-secondary)] font-bold items-center">
        <Icon />
        {text}
        <LoginButton />
      </div>
    </header>
  );
}

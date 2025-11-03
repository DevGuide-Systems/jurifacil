import { ElementType } from "react";
import Image, { StaticImageData } from "next/image";

interface HeaderProps {
  text: string;
  icon: ElementType;
  image: StaticImageData;
}

export default function Header({ icon: Icon, text, image }: HeaderProps) {
  return (
    <header className="flex flex-row justify-between items-center px-15 py-5">
      <div className="">
        <Image src={image} alt={text} width={50} height={50} />
      </div>
      <div className="flex flex-row gap-2 text-[var(--blue-secondary)] font-bold">
        <Icon />
        {text}
      </div>
    </header>
  );
}

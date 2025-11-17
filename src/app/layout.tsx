import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Scale } from "lucide-react";
import logo from "../../public/doc-logo.svg";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body className="h-screen flex flex-col">
        <Header image={logo} text="JuriFácil" icon={Scale} />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

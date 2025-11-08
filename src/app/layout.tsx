import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Scale } from "lucide-react";
import logo from "../../public/doc-logo.svg";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" className={inter.className}>
        <body>
          <Header image={logo} text="JuriFácil" icon={Scale} />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

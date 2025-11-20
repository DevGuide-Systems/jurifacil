import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Scale } from "lucide-react";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR" className={inter.className}>
        <body className="h-screen flex flex-col" suppressHydrationWarning>
          <Header text="JuriFácil" icon={Scale} />
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}

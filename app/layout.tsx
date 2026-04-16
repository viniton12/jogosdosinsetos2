import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invertebrados - Jogo Educacional",
  description: "Aprenda sobre os incríveis animais invertebrados de forma interativa e divertida!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body style={{ background: '#0a1628' }}>{children}</body>
    </html>
  );
}

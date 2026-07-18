import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Climax · Chiapas",
  description:
    "Sistema de alertas climáticas para el agro y protección civil en Chiapas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "../style/globals.css";
import ClientProvider from "../provider/ClientProvider";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Healty",
  description: "Healty App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased  `}>
        <ClientProvider>{children}</ClientProvider>
        <Toaster />
      </body>
    </html>
  );
}

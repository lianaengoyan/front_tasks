import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {OrderProvider} from "./context/OrdersContext";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Opalite Restaurant",
  icons: { icon: "/favicon2.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white font-sans">
        <OrderProvider>
          {children}
        </OrderProvider>
      </body>
    </html>
  );
}
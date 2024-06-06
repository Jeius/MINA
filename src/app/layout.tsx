import { Inter } from "next/font/google";
import "@/styles/globals.css";
import React from "react";
import BottomNav from "@/components/bottom-nav";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MINA",
  description: "MSU-IIT Navigation Aid",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`relative ${inter.className} text-white`}>
        {children}
        <footer> <BottomNav /> </footer>
      </body>
    </html>
  );
}

export default RootLayout;

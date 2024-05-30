import { Inter } from "next/font/google";
import "@/styles/globals.css";
import React from "react";
import dynamic from "next/dynamic";

const BottomNav = dynamic(() => import('../components/ui/bottom-nav'), { ssr: false })

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MINA",
  description: "MSU-IIT Navigation Aid",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer> <BottomNav /> </footer>
      </body>
    </html>
  );
}

export default RootLayout;

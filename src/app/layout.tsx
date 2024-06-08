import { Inter } from "next/font/google";
import "@/styles/globals.css";
import React from "react";
import AppContext from "@/lib/context";
import dynamic from "next/dynamic";
import BottomNav from "@/components/bottom-nav";

const CampusMap = dynamic(() => import('@/components/campus-map'), { ssr: false })

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MINA",
  description: "MSU-IIT Navigation Aid",
};


const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppContext>
      <html lang="en">
        <body className={`relative ${inter.className} text-white`}>
          <main className='relative flex flex-col h-screen w-screen bg-gray-200'>
            <CampusMap />
            {children}
          </main>

          <footer>
            <BottomNav />
          </footer>
        </body>
      </html>
    </AppContext>
  );
}


export default RootLayout;

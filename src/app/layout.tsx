import { Inter } from "next/font/google";
import "@/styles/globals.css";
import React from "react";
import AppContext from "@/lib/context";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });
const BottomNav = dynamic(() => import('@/components/bottom-nav'), { ssr: false });

const inter = Inter({ subsets: ["latin"] });
const scrollbar = 'scrollbar-thumb-gray-500 scrollbar-track-transparent';

export const metadata = {
  title: "MINA",
  description: "MSU-IIT Navigation Aid",
};


const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const glass = 'backdrop-blur-md bg-black bg-opacity-80';
  const outline = `outline outline-1 outline-slate-500`;
  const textStyle = 'text-white text-md';
  const style = 'p-3 justify-center pointer-events-auto';

  return (
    <AppContext>
      <html lang="en" className={`${inter.className} ${scrollbar} text-white text-sm overflow-hidden`}>
        <body className='relative h-screen w-screen bg-gray-300'>
          <MapComponent />

          <main className='relative size-full flex flex-col justify-items-center z-20 pointer-events-none'>
            <header className={cn(style, glass, outline, textStyle)}>
              <strong>MSU-IIT Campus Navigation Guide</strong>
            </header>

            {children}

            <footer className='fixed bottom-0 w-full pointer-events-auto'>
              <BottomNav />
            </footer>
          </main>
        </body>
      </html>
    </AppContext>
  );
}


export default RootLayout;

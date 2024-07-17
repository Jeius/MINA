import { Inter } from "next/font/google";
import "@/styles/globals.css";
import React from "react";
import AppContext from "@/lib/context";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Viewport } from "next";

const MapComponent = dynamic(() => import('@/components/map-component'), { ssr: false });
const BottomNav = dynamic(() => import('@/components/bottom-nav'), { ssr: false });

const inter = Inter({ subsets: ["latin"] });
const scrollbar = 'scrollbar-thumb-gray-500 scrollbar-track-transparent';

export const metadata = {
  title: "MINA",
  description: "MSU-IIT Navigation Aid",
};

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const glass = 'backdrop-blur-md bg-black bg-opacity-80';
  const outline = `outline outline-1 outline-slate-500`;
  const textStyle = 'text-white text-sm';
  const style = 'p-3 justify-center pointer-events-auto';

  return (
    <AppContext>
      <html lang="en">
        <body className={`fixed top-0 bottom-0 left-0 right-0 bg-gray-300 ${inter.className} ${scrollbar} text-white`}>
          <MapComponent />

          <main className='relative size-full flex-wrap flex flex-col justify-items-center z-20 pointer-events-none'>
            <header className={cn(style, glass, outline, textStyle)}>
              <strong>MSU-IIT Campus Navigation Guide</strong>
            </header>

            <section className="relative flex flex-grow flex-col">
              {children}
            </section>

            <footer className='relative w-full pointer-events-auto'>
              <BottomNav />
            </footer>
          </main>
        </body>
      </html>
    </AppContext>
  );
}


export default RootLayout;

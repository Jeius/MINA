import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { PrismaClient } from '@prisma/client'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
};


export let db: PrismaClient;

//check if we are running in production mode
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
} else {
  //check if there is already a connection to the database
  if (!(global as any).db) {
    (global as any).db = new PrismaClient()
  }
  db = (global as any).db
}

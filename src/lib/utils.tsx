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

export const stringToBoolean = (str: string | undefined): boolean => {
  return str?.toLowerCase() === 'true';
};

export const updateHash = ({
  zoom, lat, lng
}: {
  zoom: number, lat: number, lng: number
},
  triggerEvent: boolean
) => {
  const latNumber = Number(lat);
  const lngNumber = Number(lng);

  if (isNaN(latNumber) || isNaN(lngNumber)) {
    console.error("Latitude or Longitude is not a valid number");
    return;
  }

  const hash = `#map=${zoom}/${latNumber.toFixed(6)}/${lngNumber.toFixed(6)}`;
  history.replaceState(undefined, '', hash);

  triggerEvent && window.dispatchEvent(new HashChangeEvent("hashchange"));
};
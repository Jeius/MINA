import type { Config } from "tailwindcss"

const MyColorScheme: { [key: string]: string } = {
  "primary": "#931D23",
  "primary-dark": "#671419",
  "primary-light": "#d4a5a7",
  "primary-200": "#b36165",
  "primary-500": "#ff0029",
  "primary-600": "#b3001d",
  "primary-700": "#940009",
  "building": "#A28D75",
  "building-dark": "#615546",
  "park": "#3fb587",
  "park-dark": "#2B775E",
  "security": "#7b90f1",
  "security-dark": "#5362A7",
  "hostel": "#FF33A8",
  "hostel-dark": "#B22374",
  "college": "#6b7dde",
  "college-dark": "#4C5697",
  "laboratory": "#af7af5",
  "laboratory-dark": "#7640B2",
  "food": "#c5903f",
  "food-dark": "#8A622B",
  "clinic": "#FF3333",
  "clinic-dark": "#B22424",
  "school": "#6b7dde",
  "school-dark": "#4C5697",
  "hall": "#A28D75",
  "hall-dark": "#615546",
  "sports": "#2596be",
  "sports-dark": "#1B6581",
  "office": "#c5903f",
  "office-dark": "#8A622B",
  "library": "#e2552f",
  "library-dark": "#992F1D",
  "underConstruction": "#c1b22c",
  "underConstruction-dark": "#9a8e23"
}


const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: MyColorScheme,
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('tailwind-scrollbar'),
  ],
} satisfies Config

export default config


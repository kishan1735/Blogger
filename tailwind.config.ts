import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      kxl: "1800px",
    },
    extend: {
      colors: {
        primary: "#FF8400",
        accent: "#CF4307",
        background: "#FFFAEB",
        secondary: "#FFF5D6",
      },
    },
    letterSpacing: {
      widest: ".3em",
      wider: ".2em",
    },
  },
  plugins: [],
};
export default config;

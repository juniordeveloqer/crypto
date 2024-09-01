import { Titillium_Web } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },

      width: {
        navbar: "72%",
      },

      colors: {
          
        Primary: "#1A1E24",
        Secondary: "#FFFFFF",
        BackgroundPrimary: "#1A1E24",
        BackgroundSecondary: "#FFFFFF",
        textPrimary: "#FFFFFF",
        textSecondary: "#363636",
        PlaceholderColor: "#DCDCDC",
        button: {
          signup: "#55A96D",
          Primary: "#26C553",
          Secondary: "#27A84C",
          Text: "#0B6100",
          Hover: "#80F87E",
          HoverSecondary: "#258F43",
          Login: "#263238",
        },
      },

      fontFamily: {
        sans: ["var(--font-titillium_web)"],
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "1439px",

        lg: "1440px",
      },
      maxWidth: {
        desktop: "1440px",
        navbar: "72%",
      },
    },
  },
  plugins: [],
};
export default config;

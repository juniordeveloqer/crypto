import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      Primary: "#1A1E24",
      Secondary: "#FFFFFF",
      BackgroundPrimary: "#000000",
      BackgroundSecondary: "#FFFFFF",
      textPrimary: "#FFFFFF",
      button: {
        Primary: "#55A96D",
        Secondary: "#256738",
        Text: "#FFFFFF",
      },
    },
    zIndex: {
      60: "60",
      70: "70",
      80: "80",
      90: "90",
      100: "100",
    },

    extend: {},
  },
  plugins: [],
};
export default config;

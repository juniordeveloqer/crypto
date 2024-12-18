// tailwind.config.js
const config = {
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
      colors: {
        Primary: "#1A1E24",
        Secondary: "#FFFFFF",
        BackgroundPrimary: "#1A1E24",
        BackgroundSecondary: "#FFFFFF",
        textPrimary: "#FFFFFF",
        textSecondary: "#363636",
        PlaceholderColor: "#DCDCDC",
        neonGreen: '#39FF14',
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

      animation: {
        'border-reverse': 'border-reverse 4s linear infinite',
      },

      keyframes: {
        'border-reverse': {
          '0%': {
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
            borderBottomColor: 'transparent',
            borderRightColor: 'transparent',
          },
          '25%': {
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
            borderBottomColor: 'transparent',
            borderRightColor: 'neon-green',
          },
          '50%': {
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
            borderBottomColor: 'neon-green',
            borderRightColor: 'neon-green',
          },
          '75%': {
            borderTopColor: 'transparent',
            borderLeftColor: 'neon-green',
            borderBottomColor: 'neon-green',
            borderRightColor: 'neon-green',
          },
          '100%': {
            borderTopColor: 'neon-green',
            borderLeftColor: 'neon-green',
            borderBottomColor: 'neon-green',
            borderRightColor: 'neon-green',
          },
        },
      },



      fontFamily: {
        sans: ["var(--font-titillium_web)"],
      },
      screens: {
        sm: "640px",
        md: "1439px",
        lg: "1440px",
      },
      maxWidth: {
        desktop: "1440px",
        navbar: "72%",
        section: "80%",
        screen: "100vw",
      },
    },
  },
  plugins: [],
};

export default config;

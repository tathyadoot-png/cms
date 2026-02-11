import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      
    colors: {
  primary: "var(--color-primary)",     // Kesariya
  secondary: "var(--color-secondary)", // Blue
  green: "var(--color-green)",         // Vikas Green

  text: "var(--color-text)",
  muted: "var(--color-text-muted)",

  bg: "var(--color-bg)",
  "bg-soft": "var(--color-bg-soft)",

  border: "var(--color-border)",
},

      
     fontFamily: {
        amita: ['"Amita"', 'serif'],
        asar: ['"Asar"', 'serif'],
        gotu: ['"Gotu"', 'sans-serif'],
        playpen: ['"Playpen Sans Deva"', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.06)",
        navbar: "0 2px 12px rgba(0, 0, 0, 0.08)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

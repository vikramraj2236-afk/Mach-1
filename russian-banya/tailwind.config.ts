import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171714", charcoal: "#22221e", bark: "#5b4030",
        cream: "#eee9df", sand: "#c9bba6", gold: "#b89a65"
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;

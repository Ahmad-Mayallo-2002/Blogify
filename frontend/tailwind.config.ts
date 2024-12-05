import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        greenColor: "#4D9C0F",
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xlg: "1200px",
        "2xlg": "1400px",
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;

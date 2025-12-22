/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#0b0f19",
          900: "#0f172a",
          800: "#111827",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

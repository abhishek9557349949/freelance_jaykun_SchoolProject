/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundPosition: {
        left: "left",
        right: "right",
      },
      colors: {
        primary: "#00796B", // Example primary color (teal)
      },
    },
  },
  plugins: [],
};

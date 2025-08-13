/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}" // <— añade js/jsx/tsx por si acaso
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          rose: "#F9A8D4",
          fuchsia: "#E879F9",
          violet: "#A78BFA",
          pinkBg: "#FCE7F3",
          lilacBg: "#F5D0FE"
        }
      },
      borderRadius: { "2xl": "1rem" }
    }
  },
  plugins: []
};

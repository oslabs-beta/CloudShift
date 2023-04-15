/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        play: ["Play", "sans-serif"],
      },
    },
  },
  plugins: [],
};

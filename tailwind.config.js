/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#363738",
        },

        secondary: "#DB4444",

        "secondary-light": "#F5F5F5",

        "dark-bg": "#121212",
      },
    },
  },
  plugins: [],
};

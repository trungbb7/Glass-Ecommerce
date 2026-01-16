/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Tất cả tùy chỉnh nên nằm trong này
      colors: {
        primary: {
          DEFAULT: "#363738",
        },
        secondary: "#DB4444",
        "secondary-light": "#F5F5F5",
        "dark-bg": "#121212",
      },
      // Chuyển keyframes và animation vào đây
      keyframes: {
        dropDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "drop-down": "dropDown 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

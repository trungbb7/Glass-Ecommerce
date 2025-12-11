/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // Thêm các loại file mà bạn dùng Tailwind classes
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Màu chính (Primary Color)
        primary: {
          // Bạn có thể định nghĩa các sắc độ (shades) như Tailwind
          DEFAULT: "#363738", // Màu mặc định khi dùng 'bg-primary'
        },
        // Màu phụ (Secondary Color)
        secondary: "#DB4444", // Khi chỉ có một sắc độ, dùng trực tiếp mã hex

        "secondary-light": "#F5F5F5",
        // Màu cảnh báo tùy chỉnh

        // Màu nền tùy chỉnh
        "dark-bg": "#121212",
      },
    },
  },
  plugins: [],
};

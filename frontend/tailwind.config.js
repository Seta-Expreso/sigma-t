/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Colores principales (de maquetas v2.6)
        primary: {
          DEFAULT: '#1a2a3a',
          light: '#00b4d8',
          lighter: '#e8f4f8',
        },
        success: '#2ecc71',
        warning: '#f39c12',
        danger: '#e74c3c',
        // Colores grises (opcionales)
        gray: {
          neutral: '#f8f9fa',
          medium: '#e9ecef',
          dark: '#495057',
          darker: '#212529',
        },
        white: '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
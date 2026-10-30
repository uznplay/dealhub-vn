/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noti: {
          50: '#f0fdf2',
          100: '#dbf9df',
          200: '#b8f3bf',
          300: '#84e790',
          400: '#4ad35c',
          500: '#1faa08', // NOTI primary vibrant green
          600: '#168d06',
          700: '#136f08',
          800: '#14580c',
          900: '#12480d',
          dark: '#0e3a0a',
        },
        piggy: {
          light: '#fff0f3',
          pink: '#ff859c',
          dark: '#e6496f'
        },
        shopee: '#ee4d2d',
        chotot: '#f89a1c',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


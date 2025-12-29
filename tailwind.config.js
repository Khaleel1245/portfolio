/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#ecfdf5', // Emerald 50
          100: '#d1fae5', // Emerald 100
          200: '#a7f3d0', // Emerald 200
          300: '#6ee7b7', // Emerald 300
          400: '#34d399', // Emerald 400
          500: '#10b981', // Emerald 500 (Primary Accents)
          600: '#059669', // Emerald 600
          700: '#047857', // Emerald 700
          800: '#065f46', // Emerald 800
          900: '#064e3b', // Emerald 900
        },
        blue: {
          50: '#f0fdfa', // Teal 50
          100: '#ccfbf1', // Teal 100
          200: '#99f6e4', // Teal 200
          300: '#5eead4', // Teal 300
          400: '#2dd4bf', // Teal 400
          500: '#14b8a6', // Teal 500
          600: '#0d9488', // Teal 600
          700: '#0f766e', // Teal 700
          800: '#115e59', // Teal 800
          900: '#134e4a', // Teal 900
        },
        cyan: {
          300: '#bef264', // Lime 300 (Accent brightness)
          500: '#84cc16', // Lime 500
        },
        indigo: {
          500: '#22c55e', // Green 500
          600: '#16a34a', // Green 600
        },
        purple: {
          50: '#f0fdf4',
          500: '#10b981',
          600: '#059669',
        },
        slate: {
          800: '#064e3b', // Deep Forest Green for dark modes
          900: '#022c22', // Darker Forest
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      KumbhSans: "url('assets/fonts/KumbhSans-VariableFont_YOPQ,wght.ttf')"
    }
  },
  plugins: [],
}
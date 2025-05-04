/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003366",  // ExpoHub blue
        accent: "#00bcd4",
        neutral: "#f8f9fa",
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 'primary-color': '#072AC8',
        'primary-color':'#3458D9',
        'custom-gradient': 'linear-gradient(90deg, #5A78FF 0%, #072AC8 100%)',
      }
    },
  },
  plugins: [],
}
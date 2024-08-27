/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom': [
          'Circular Std',
          'system-ui', /* This is the generic system font */
          '-apple-system', /* For Apple devices */
          'BlinkMacSystemFont', /* For macOS */
          'sans-serif'
        ]
      }
    }
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'selector',
   content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	  "./src/components/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
	  extend: {
		 colors: {
			secondary: '#AECACD',
		 }
	  },
   },
   plugins: [
	  require('@tailwindcss/forms'),
   ],
}


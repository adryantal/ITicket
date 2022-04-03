const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        colors: {
                'regal-blue': '#243c5a',
                'bg-sky-200': 'rgb(186 230 253)',
                'bg-sky-100': 'rgb(224 242 254)',
                'bg-sky-300': 'rgb(125 211 252)',
              },
        },
        
    },

    plugins: [require('@tailwindcss/forms')],
   

    
};

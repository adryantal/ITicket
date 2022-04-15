const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')


.postCss('resources/css/app.css', 'public/css', [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
])
.postCss('resources/css/switchboard.css','public/it/css', [])
.postCss('resources/css/switchboardfordb.css','public/it/css', [])
.postCss('resources/css/loggedout.css','public/it/css', [])
.postCss('resources/css/notauthorized.css','public/it/css', [])
.postCss('resources/css/frame.css','public/it/css', []) 
.postCss('resources/css/ticketlist.css','public/it/css', [])  
.postCss('resources/css/modifyticket.css','public/it/css', [])
.postCss('resources/css/newticket.css','public/it/css', [])
.postCss('resources/css/newuser.css','public/it/css', [])
.postCss('resources/css/login.css','public/it/css', [])
.postCss('resources/css/charts.css','public/it/css', []);

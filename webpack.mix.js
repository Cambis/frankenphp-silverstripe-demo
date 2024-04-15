/**
 * The build is run with laravel-mix, see docs here: https://laravel-mix.com
 */
const mix = require('laravel-mix');
const fs = require('fs');

// parse environment variables from .env
require('dotenv').config();

// define paths
const srcFolder = `./themes/app/src`;
const distFolder = `./themes/app/dist`;
const publicFolder = `/_resources/${distFolder.substring(2)}/`; // remove leading ./

mix.setPublicPath(distFolder);
mix.setResourceRoot(publicFolder); // Prefixes urls in processed css with _resources/themes/app/dist

// Do the mix!
mix.postCss(`${srcFolder}/css/app.css`, '/', [require('tailwindcss')]);

if (process.env.NODE_ENV === 'development') {
  mix.sourceMaps();
  mix.webpackConfig({ devtool: 'inline-source-map' });
}

mix.version();

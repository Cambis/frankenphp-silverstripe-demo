/**
 * The build is run with laravel-mix, see docs here: https://laravel-mix.com
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const mix = require('laravel-mix');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// parse environment variables from .env
require('dotenv').config();

// define paths
const srcFolder = `./themes/app/src`;
const distFolder = `./themes/app/dist`;
const publicFolder = `/_resources/${distFolder.substring(2)}/`; // remove leading ./

mix.setPublicPath(distFolder);
mix.setResourceRoot(publicFolder); // Prefixes urls in processed css with _resources/themes/app/dist

// Do the mix!
mix.ts(`${srcFolder}/js/app.tsx`, '/').react();
mix.postCss(`${srcFolder}/css/app.css`, '/', [require('tailwindcss')]);

mix.webpackConfig({
  plugins: [
    new ESLintPlugin({
      configType: 'flat',
      eslintPath: 'eslint/use-at-your-own-risk',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
  },
});

if (process.env.NODE_ENV === 'development') {
  mix.sourceMaps();
  mix.webpackConfig({
    devtool: 'inline-source-map',
  });
}

mix.version();

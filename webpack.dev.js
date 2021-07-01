const { merge } = require('webpack-merge');
const path = require('path');
const base = require('./webpack.config.js');
const ExtensionReloader = require('webpack-extension-reloader');

module.exports = merge(base, {
  mode: 'development',
  watch: true,
  entry: {
    contents: './src/contents.tsx',
    background: './src/background.ts',
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
  plugins: [
    new ExtensionReloader({
      manifest: path.resolve(__dirname, "./public/manifest.json"),
      port: 3001,
      reloadPage: true,
      entries: {
        contentScript: "contents",
        background: "background",
      },
    }),
  ],
});
const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { globSync } = require('glob');

const entries = {};

const blockFiles = globSync(['blocks/**/*.js', 'blocks/**/*.css'])
  .map((filepath) => filepath.replaceAll(path.sep, '/'))
  .filter((filepath) => {
    const parts = filepath.split('/');
    return parts[1] === parts[2].replace(/\.(js|css)$/, '');
  })
  .map((filepath) => `./${filepath}`);

blockFiles.forEach((filepath) => {
  const blockName = path.basename(filepath.replace(/\.(js|css)$/, ''));
  if (filepath.endsWith('.js')) {
    entries[blockName] = {
      import: filepath,
      dependOn: 'main',
    };
  } else {
    entries[`${blockName}-css`] = filepath;
  }
});

// get all css files,
// remove obsolete ones and merge into one css file
const cssfiles = globSync([
  'styles/**/*.css',
  // 'blocks/**/*.css',
  'templates/**/*.css',
]).map((filepath) => `./${filepath.replaceAll(path.sep, '/')}`);

module.exports = {
  mode: 'development', // 'production' | ' development'
  devtool: false,
  entry: {
    main: './scripts/scripts.js',
    styles: {
      import: cssfiles,
    },
    ...entries,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
      // eslint-disable-next-line max-len
      // For webpack@5 you can use the ... syntax to extend existing minimizers (i.e. `terser-webpack-plugin`),
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};

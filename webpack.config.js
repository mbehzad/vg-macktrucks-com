const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { globSync } = require('glob');

// e.g. "./blocks/footer/footer.css" -> "footer"
function getBlockName(filepath) {
  return filepath.split('/')[2] ?? '';
}

// get all css files,
// remove obsolete ones and merge into one css file
let cssfiles = globSync([
  'styles/styles.css',
  'blocks/**/*.css',
  'templates/**/*.css',
]).map((filepath) => `./${filepath.replaceAll(path.sep, '/')}`);
const blockNames = cssfiles.map(getBlockName);
// remove blocks having v2
cssfiles = cssfiles.filter(
  (filepath) => {
    const blockName = getBlockName(filepath);
    return !blockNames.includes(`v2-${blockName}`) && (blockName !== 'search');
  },
);

module.exports = {
  mode: 'production', // 'production' | ' development'
  devtool: false,
  entry: {
    main: './scripts/scripts.js',
    styles: {
      import: cssfiles,
    },
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

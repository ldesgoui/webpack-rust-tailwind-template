const glob = require("glob")
const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const OptimizeWasmPlugin = require("optimize-wasm-webpack-plugin")
const PurgecssPlugin = require("purgecss-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin")

const dist = path.resolve(__dirname, "dist")

module.exports = {
  entry: "./index.js",

  output: {
    path: dist,
    filename: "[name].js",
  },

  devServer: {
    contentBase: dist,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("tailwindcss"), require("autoprefixer")],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new WasmPackPlugin({
      crateDirectory: __dirname,
    }),

    new HtmlWebpackPlugin(),

    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],

  optimization: {
    minimizer: [
      new TerserPlugin(),

      new PurgecssPlugin({
        paths: () => glob.sync("./src/**/*.rs"),
        extractors: [
          {
            extractor: class {
              static extract(content) {
                return content.match(/[\w-/:]+(?<!:)/g) || []
              }
            },
            extensions: ["rs"],
          },
        ],
      }),

      new OptimizeCssAssetsPlugin(),

      new OptimizeWasmPlugin(),
    ],
  },
}

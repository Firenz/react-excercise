const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const basePath = __dirname;

module.exports = {
  mode: "development",
  context: path.join(basePath, "src"),
  resolve: {
    alias: {
      models: path.resolve(__dirname, "./src/models"),
      layouts: path.resolve(__dirname, "./src/layouts"),
      components: path.resolve(__dirname, "./src/components"),
      scenes: path.resolve(__dirname, "./src/scenes"),
      api: path.resolve(__dirname, "./src/api")
    },
    extensions: [".js", ".ts", ".tsx"]
  },
  entry: ["./main.tsx"],
  output: {
    path: path.join(basePath, "dist"),
    filename: "[name].js"
  },
  devtool: "inline-source-map",
  devServer: {
    inline: true,
    host: "localhost",
    port: 8080,
    stats: "minimal"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
        options: {
          useBabel: true,
          babelCore: "@babel/core" // needed for Babel v7
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /node_modules/,
        use: {
          loader: "url-loader",
          options: {
            limit: 50000,
            name: "./img/[hash].[name].[ext]",
            esModule: false
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html"
    })
  ]
};

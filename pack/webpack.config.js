const path = require("path");
const base = path.resolve(__dirname, "..");
module.exports = {
  mode: "development",
  context: base,
  entry: {
    index: "./src/home"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: [require.resolve("@babel/preset-env"), require.resolve("@babel/preset-react")]
          // plugins: [
          //   require.resolve("babel-plugin-add-module-exports"),
          //   require.resolve("babel-plugin-react-require"),
          //   require.resolve("babel-plugin-syntax-dynamic-import"),
          //   require.resolve("react-hot-loader/babel")
          // ],
          // cacheDirectory: true
        }
      }
    ]
  },
  externals: [{ react: "React", "react-dom": "ReactDOM" }],
  output: {
    path: path.resolve(base, "public/js"),
    filename: `[name].js`,
    chunkFilename: `module/[name].[chunkhash].js`,
    publicPath: "/"
  },
  stats: "errors-warnings"
};

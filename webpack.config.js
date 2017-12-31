const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const nodeEnv = process.env.NODE_ENV || "development";
const isProd = nodeEnv === "production";

var config = {
  devtool: isProd ? "hidden-source-map" : "source-map",
  context: path.resolve("./src"),
  entry: {
    app: "./main.js",
    vendor: "./vendor.ts"
  },
  output: {
    path: path.resolve("./docs"),
    filename: "[name].bundle.js",
    sourceMapFilename: "[name].bundle.map",
    devtoolModuleFilenameTemplate: function (info) {
      return "file:///" + info.absoluteResourcePath;
    }
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.ts?$/,
        exclude: ["node_modules"],
        use: ["awesome-typescript-loader", "source-map-loader"]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      { test: /\.html$/, loader: "html-loader" },
      { test: /\.ejs$/, loader: "ejs-loader" },
      { test: /\.css$/, loaders: ["style-loader", "css-loader"] },
      { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
      {
        test: /\.(png|gif|jpg|svg|jpeg)$/i,
        use: {
          loader: 'file-loader',
          query: {
            name: 'assets/[hash].[ext]'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  externals: {
        'rxjs': 'window.Rx'
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // eslint-disable-line quote-props
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new HtmlWebpackPlugin({
      title: "rxjs study notes",
      template: "!!ejs-loader!src/index.ejs"
    }),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/assets',
      to: 'assets'
    }]),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
      filename: "vendor.bundle.js"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: true
    }),
    //new DashboardPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    compress: true,
    port: 3000,
    hot: true
  }
};

module.exports = config;

const load = require("./load");
const MiniCssExtractPlugin = load("mini-css-extract-plugin");
const path = require("path");
const fs = require("fs");

const createRule = context => {
  const { isDev, hot, extractCSS, projectPath } = context;

  let antdTheme = {};
  const themePath = path.join(projectPath, "/style/theme.json");
  if (fs.existsSync(themePath)) {
    antdTheme = require(themePath);
  }

  const styleLoader = extractCSS
    ? MiniCssExtractPlugin.loader
    : "vue-style-loader";

  const jsloader = {
    test: /\.js$/,
    use: ["babel-loader"],
    exclude: hot
      ? /node_modules/
      : file => {
          if (/ynw/.test(file)) return false;
          return /node_modules/.test(file);
        }
  };

  if (!hot) {
    jsloader.use.unshift("ynw-loader");
  }

  if (!isDev) {
    jsloader.use.push("uglify-template-string-loader");
  }

  return [
    { test: /\.css$/, use: [styleLoader, "css-loader"] },
    {
      test: /\.scss$/,
      use: [styleLoader, "css-loader", "sass-loader"]
    },
    {
      test: /\.less/,
      use: [
        styleLoader,
        "css-loader",
        {
          loader: "less-loader",
          options: {
            modifyVars: antdTheme,
            javascriptEnabled: true
          }
        }
      ]
    },
    jsloader,
    { test: /\.vue$/, loader: "vue-loader" },
    {
      test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg)(\?.+)?$/,
      use: [
        {
          loader: "url-loader",
          options: { limit: 200, name: "assets/[name].[hash:6].[ext]" }
        }
      ]
    }
  ];
};

const postcssPipe = rules => {
  rules.forEach(item => {
    item.use.push("postcss-loader");
  });
};

module.exports = context => option => {
  const rules = createRule(context);
  if (!context.isDev) {
    postcssPipe([rules[0], rules[1]]);
  }
  option.module.rules = rules;
  return option;
};

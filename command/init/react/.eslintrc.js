module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  globals: {
    log: true,
    importName: true,
    __dirname: true,
    importVueComps: true,
    process: true,
    path: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    semi: 2,
    "react/prop-types": "off",
    "no-irregular-whitespace": "off",
    "no-console": "off"
  }
};

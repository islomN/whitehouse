module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "babel-eslint",
    "ecmaVersion": 6,
    "sourceType": "module"
  }
};

// functions/.eslintrc.js
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true, // This is the most important line to add/ensure is present
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for modern JS syntax
  },
  rules: {
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "object-curly-spacing": ["error", "always"],
    "require-jsdoc": 0, // Disables the need for JSDoc comments
    "max-len": ["error", { "code": 120 }], // Sets a reasonable max line length
  },
};
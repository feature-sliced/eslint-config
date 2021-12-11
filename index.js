const path = require("path");

module.exports = {
    parserOptions: {
        "ecmaVersion": "2015",
        "sourceType": "module",
    },
    extends: [
        path.resolve(__dirname, "./rules/public-api-boundaries"),
        path.resolve(__dirname, "./rules/layers-slices-boundaries"),
        path.resolve(__dirname, "./rules/import-order")
    ],
};

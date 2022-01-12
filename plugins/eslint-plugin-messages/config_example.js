const path = require("path");

module.exports = {
    plugins:    ["eslint-plugin-messages"],
    processor: "messages/fs",
    parserOptions: {
        "ecmaVersion": "2015",
        "sourceType": "module",
    },
    extends: [
        path.resolve(__dirname, "./rules/public-api"),
        path.resolve(__dirname, "./rules/layers-slices"),
        path.resolve(__dirname, "./rules/import-order")
    ],
};

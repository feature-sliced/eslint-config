const path = require("path");

module.exports = {
    parserOptions: {
        "ecmaVersion": "2015",
        "sourceType": "module",
    },
    extends: [
        path.resolve(__dirname, "./public-api-boundaries.js"),
        path.resolve(__dirname, "./layers-slices-boundaries.js")
    ],
};

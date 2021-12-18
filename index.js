const path = require("path");

module.exports = {
    parserOptions: {
        "ecmaVersion": "2015",
        "sourceType": "module",
    },
    extends: [
        "./rules/public-api-boundaries",
        "./rules/layers-boundaries",
        "./rules/slices-boundaries",
        "./rules/import-order",
    ].map(require.resolve),
};

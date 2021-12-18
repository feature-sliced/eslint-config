const path = require("path");

module.exports = {
    parserOptions: {
        "ecmaVersion": "2015",
        "sourceType": "module",
    },
    extends: [
        "./rules/public-api-boundaries",
        "./rules/slices-and-layers-boundaries",
        "./rules/import-order",
    ].map(require.resolve),
};

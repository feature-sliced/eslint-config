module.exports = {
    parserOptions: {
        "ecmaVersion": "2015",
        "sourceType": "module",
    },
    extends: [
        "./rules/public-api",
        "./rules/layers-slices",
        "./rules/import-order",
    ].map(require.resolve),
};

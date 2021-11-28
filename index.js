const { getLayersBoundariesElements, getLayersRules} = require("./layers")

module.exports = {
    parserOptions: {
        "ecmaVersion": "2015",
        "sourceType": "module",
    },
    plugins: ["boundaries", "import"],
    extends: ["plugin:boundaries/recommended"],
    ignorePatterns: [".eslintrc.js"],
    settings: {
        "boundaries/elements": getLayersBoundariesElements(),
    },
    rules: {
        "boundaries/element-types": [
            2,
            {
                "default": "disallow",
                "message": "${file.type} is not allowed to import ${dependency.type}",
                "rules": getLayersRules(),
            }
        ],
    },
};

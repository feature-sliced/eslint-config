const { getLowerLayers, FS_LAYERS } = require("./helpers");

const getLayersRules = () =>
    FS_LAYERS.map((layer) => ({
        from: layer,
        allow: getLowerLayers(layer),
    }));

const getLayersBoundariesElements = () =>
    FS_LAYERS.map((layer) => ({
        type: layer,
        pattern: `${layer}/*`,
        mode: "folder",
        capture: ["slices"],
    }));

module.exports = {
    parserOptions: {
        "ecmaVersion": "2015",
        "sourceType": "module",
    },
    plugins: ["boundaries"],
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
                "message": "\"${file.type}\" is not allowed to import \"${dependency.type}\" | See rules: https://feature-sliced.design/docs/reference/layers/overview ",
                "rules": getLayersRules(),
            },
        ],
    },
};
const { layersLib } = require("../../utils");

const getLayersRules = () =>
    layersLib.FS_LAYERS.map((layer) => ({
        from: layer,
        allow: layersLib.getLowerLayers(layer),
    }));

const getAllBoundariesElements = () =>
    layersLib.FS_LAYERS.map((layer) => ({
        type: layer,
        pattern: `${layer}/*`,
        mode: "folder",
        capture: ["slices"],
    }));

module.exports = {
    plugins: ["boundaries"],
    extends: ["plugin:boundaries/recommended"],
    ignorePatterns: [".eslintrc.js"],
    settings: {
        "boundaries/elements": getAllBoundariesElements(),
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
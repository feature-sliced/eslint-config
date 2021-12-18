const { layersLib } = require("../../utils");

const withLayerPrefix = (layer) => `layer:${layer}`

const getLayersRules = () =>

    layersLib.FS_LAYERS.map((layer) => ({
        from: withLayerPrefix(layer),
        disallow: layersLib.getUpperLayers(withLayerPrefix(layer)),
    }));

const getLayersBoundariesElements = () =>
    layersLib.FS_LAYERS.map((layer) => ({
        type: withLayerPrefix(layer),
        pattern: `${layer}/**`,
        mode: "folder",
        capture: ["layers"],
    }));

module.exports = {
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
                "default": "allow",
                "message": "\"${file.type}\" is not allowed to import \"${dependency.type}\" | See rules: https://feature-sliced.design/docs/reference/layers/overview ",
                "rules": getLayersRules(),
            },
        ],
    },
};

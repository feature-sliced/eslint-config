const { layersLib } = require("../../utils");

const withSlicePrefix = (slice) => `slice:${slice}`;

const getSlicesRules = () =>
    layersLib.FS_LAYERS.map((layer) => ({
        from: withSlicePrefix(layer),
        allow: layersLib.FS_LAYERS.filter(item => item !== layer).
            map(item => withSlicePrefix(item)),
    }));

const getSlicesBoundariesElements = () =>
    layersLib.FS_LAYERS.map((layer) => ({
        type: withSlicePrefix(layer),
        pattern: `${layer}`,
        mode: "folder",
        capture: ["slices"],
    }));

module.exports = {
    plugins: ["boundaries"],
    extends: ["plugin:boundaries/recommended"],
    ignorePatterns: [".eslintrc.js"],
    settings: {
        "boundaries/elements": getSlicesBoundariesElements(),
    },
    rules: {
        "boundaries/element-types": [
            2,
            {
                "default": "disallow",
                "message": "\"${file.type}\" is not allowed to import \"${dependency.type}\" | See rules: https://feature-sliced.design/docs/reference/layers/overview ",
                "rules": getSlicesRules(),
            },
        ],
    },
};

const { layersLib } = require("../../utils");

const getSlicesRules = () =>
    layersLib.FS_LAYERS.map((layer) => ({
        from: layer,
        disallow: layer,
    }));

const getSlicesBoundariesElements = () =>
    layersLib.FS_LAYERS.map((layer) => ({
        type: layer,
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
                "default": "allow",
                "message": "\"${file.type}\" is not allowed to import \"${dependency.type}\" | See rules: https://feature-sliced.design/docs/concepts/app-splitting#group-slices ",
                "rules": getSlicesRules(),
            },
        ],
    },
};

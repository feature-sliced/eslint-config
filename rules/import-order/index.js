const { layersLib } = require("../../utils/layers");

module.exports = {
    plugins: [
        "import",
    ],
    rules: {
        "import/order": [
            2,
            {
                pathGroups: layersLib.FS_LAYERS.map(
                    (layer) => ({
                        pattern: `${layer}/**` ,
                        group: "internal",
                        position: "after",
                    }),
                ),
                pathGroupsExcludedImportTypes: ["builtin"],
                groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
            },
        ],
    },
};

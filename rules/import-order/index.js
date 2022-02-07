const { layersLib } = require("../../utils");

module.exports = {
    plugins: [
        "import",
    ],
    rules: {
        "import/order": [
            2,
            {
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                pathGroups: layersLib.FS_LAYERS.map(
                    (layer) => ({
                        pattern: `**/?(*)${layer}{,/**}`,
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

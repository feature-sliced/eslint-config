const { layersLib } = require("../../utils");
const REVERSED_FS_LAYERS = [...layersLib.FS_LAYERS].reverse();

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
                'newlines-between': 'always',
                pathGroups: REVERSED_FS_LAYERS.map(
                    (layer) => ({
                        pattern: `**/?(*)${layer}/**` ,
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

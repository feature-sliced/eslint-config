const FS_LAYERS = [
    "app",
    "processes",
    "widgets",
    "pages",
    "features",
    "entities",
    "shared",
];

const lowerThenLayer = (type, layers) => layers.slice(layers.indexOf(type) + 1)

module.exports = {
    parserOptions: {
        ecmaVersion: "2015",
        sourceType: "module",
    },
    plugins: ["boundaries", "import"],
    extends: ["plugin:boundaries/recommended"],
    ignorePatterns: ['.eslintrc.js'],
    settings: {
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
            },
        },
        "boundaries/elements":
            FS_LAYERS.map((layer) => ({
                type: layer,
                pattern: `${layer}/*`,
                mode: "folder",
                capture: ["slices"]
            }))
    },
    rules: {
        // FIXME: debug only
        "import/first": 2,
        "boundaries/element-types": [
            2,
            {
                "default": "disallow",
                "message": "${file.type} is not allowed to import ${dependency.type}",
                "rules": FS_LAYERS.map((layer) => ({
                    from: layer,
                    allow: lowerThenLayer(layer, FS_LAYERS)
                }))
            }
        ],
    },
};

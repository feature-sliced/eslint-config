// Allowed paths for public API
const PUBLIC_PATHS = [
    "app",
    "pages",
    "features",
    "shared",
    "shared/**",
    "models",
];
// Private imports are prohibited, use public imports instead
const PRIVATE_PATHS = [
    "app/**",
    "pages/**",
    "features/**",
    "shared/*/**",
];
// Prefer absolute imports instead of relatives (for root modules)
const RELATIVE_PATHS = [
    "../**/app",
    "../**/pages",
    "../**/features",
    "../**/shared",
    "../**/models",
];

module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
        sourceType: "module",
    },
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    plugins: [
        "@typescript-eslint",
    ],
    rules: {
        "import/first": 2,
        "import/no-unresolved": 0,
        "import/order": [
            2,
            {
                pathGroups: PUBLIC_PATHS.map(
                    (pattern) => ({
                        pattern,
                        group: "internal",
                        position: "after",
                    }),
                ),
                pathGroupsExcludedImportTypes: ["builtin"],
                groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
            },
        ],
        // TODO: with messages
        "no-restricted-imports": [2, { patterns: [...PRIVATE_PATHS, ...RELATIVE_PATHS] }],
    },
};

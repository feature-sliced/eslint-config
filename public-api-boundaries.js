const { getUpperLayers, FS_SEGMENTS } = require("./helpers");

module.exports = {
    parserOptions: {
        "ecmaVersion": "2015",
        "sourceType": "module",
    },
    plugins: ["import"],
    rules: {
        "import/no-internal-modules": [
            "error", {
                "forbid": [
                    /* Forbid segments import from sub-slices (layer/form/ui) */
                    ...getUpperLayers("shared").
                        map(layer => `${layer}/!(${FS_SEGMENTS.join("|")})/?(${FS_SEGMENTS.join("|")})/*`),

                    /* Forbid import from slices segments (ui|lib|model|etc) */
                    ...getUpperLayers("shared").
                        map(layer => `**/${layer}/!(${FS_SEGMENTS.join("|")})/**/*`),

                    /* Forbid not segment imports from shared */
                    `/shared/!(${FS_SEGMENTS.join("|")})/**/*`,
                ],
            }],
    },
};

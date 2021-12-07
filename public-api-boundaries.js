const { getUpperLayers, FS_SEGMENTS, FS_LAYERS } = require("./helpers");

module.exports = {
    parserOptions: {
        "ecmaVersion": "2015",
        "sourceType": "module",
    },
    plugins: ["import"],
    rules: {
        "import/no-internal-modules": [
            "error", {
                "allow": [
                    /* Allow not segments import from slices ex: entities/form */
                    `**/*(${getUpperLayers("shared").join("|")})/!(${FS_SEGMENTS.join("|")})`,
                    /* Allow sub-slices from slices */
                    `**/*(${FS_LAYERS.join("|")})/!(${FS_SEGMENTS.join("|")})/!(${FS_SEGMENTS.join("|")})`,
                    /* Allow not segments import in shared segments */
                    `**/shared/!(${FS_SEGMENTS.join("|")})/*`,
                    /* Allow import from segments in shared */
                    `**/shared/*(${FS_SEGMENTS.join("|")})`,
                ],
            }],
    },
};

const { getUpperLayers, FS_SEGMENTS, FS_LAYERS } = require("../../utils/helpers");

const FS_SEGMENTS_REG = FS_SEGMENTS.join("|");
const FS_LAYERS_REG = FS_LAYERS.join("|");

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
                    /**
                     * Allow not segments import from slices
                     * @example
                     * 'entities/form/ui' // Fail
                     * 'entities/form' // Pass
                     */
                    `**/*(${getUpperLayers("shared").join("|")})/!(${FS_SEGMENTS_REG})`,

                    /**
                     * Allow slices with structure grouping
                     * @example
                     * 'features/auth/form' // Pass
                     */
                    `**/*(${FS_LAYERS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

                    /**
                     * Allow not segments import in shared segments
                     * @example
                     * 'shared/ui/button' // Pass
                     */
                    `**/shared/*(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

                    /**
                     * Allow import from segments in shared
                     * @example
                     * 'shared/ui' // Pass
                     */
                    `**/shared/*(${FS_SEGMENTS_REG})`,
                ],
            }],
    },
};

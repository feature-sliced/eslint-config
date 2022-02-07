const { layersLib } = require("../../utils");

const FS_SLICED_LAYERS_REG = layersLib.getUpperLayers("shared").join("|");
const FS_SEGMENTS_REG = [
    ...layersLib.FS_SEGMENTS,
    ...layersLib.FS_SEGMENTS.map((seg) => `${seg}.*`),
].join('|');

module.exports = {
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
                    `**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})`,

                    /**
                     * Allow slices with structure grouping
                     * @example
                     * 'features/auth/form' // Pass
                     */
                    `**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

                    /**
                     * Allow not segments import in shared segments
                     * @example
                     * 'shared/ui/button' // Pass
                     */
                    `**/*shared/*(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

                    /**
                     * Allow import from segments in shared
                     * @example
                     * 'shared/ui' // Pass
                     */
                    `**/*shared/*(${FS_SEGMENTS_REG})`,

                    /** allow global modules */
                    `**/node_modules/**`,

                    /**
                     * allow custom shared segments with _prefix
                     */
                    `**/*shared/_*`,
                    `**/*shared/_*/*`,

                    /**
                     *  Used for allow import local modules
                     * @example
                     * './model/something' // Pass
                     */
                    `./**`

                ],
            }],
    },
};

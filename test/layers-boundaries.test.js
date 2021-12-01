const {ESLint} = require("eslint");
const assert = require("assert");
const path = require("path");
const cfg = require("..");
const { getRandomImportByLayerName } = require("./utils");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: {
        ...cfg, settings: {
            ...cfg.settings,
            'import/resolver': {
                [path.resolve(__dirname, './mock-resolver.js')]: {
                    extension: "js",
                }
            }
        }
    }
})

describe("Import boundaries between layers", () => {

    it("should lint with cross-import errors.", async () => {
        const wrongImports = [
            getRandomImportByLayerName("app"),
            getRandomImportByLayerName("processes"),
            getRandomImportByLayerName("widgets"),
            getRandomImportByLayerName("features"),
            getRandomImportByLayerName("entities"),
        ];

        const report = await eslint.lintText(wrongImports.join('\n'), {
            filePath: "src/shared/lib/index.js",
        });
        assert.strictEqual(report[0].errorCount, wrongImports.length);
    });

    it("should lint without errors.", async () => {
        const validImports = [
            getRandomImportByLayerName("processes"),
            getRandomImportByLayerName("widgets"),
            getRandomImportByLayerName("features"),
            getRandomImportByLayerName("entities"),
            getRandomImportByLayerName("shared")
        ];

        const report = await eslint.lintText(validImports.join('\n'), {
            filePath: "src/app/ui/app.js"
        });
        assert.strictEqual(report[0].errorCount, 0);
    })

});

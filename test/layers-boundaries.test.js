const { ESLint } = require("eslint");
const assert = require("assert");
const { getRandomImportByLayerName } = require("./utils/tools");
const { mockImports } = require("./utils/mock-import");
const cfg = require("..");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: mockImports(cfg),
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

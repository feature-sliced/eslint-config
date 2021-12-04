const { ESLint } = require("eslint");
const assert = require("assert");
const { getRandomImportByLayerName } = require("./utils/tools");
const { mockImports } = require("./utils/mock-import");
const cfg = require("..");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: mockImports(cfg),
})

describe("Import boundaries between slices", () => {

    it("should lint with cross-import errors between pages.", async () => {
        const wrongImports = [
            getRandomImportByLayerName("pages"),
            getRandomImportByLayerName("pages"),
        ];

        const report = await eslint.lintText(wrongImports.join('\n'), {
            filePath: "src/pages/mock/index.js",
        });

        assert.strictEqual(report[0].errorCount, wrongImports.length);
    });

    it("should lint with cross-import errors between widgets.", async () => {
        const wrongImports = [
            getRandomImportByLayerName("widgets"),
            getRandomImportByLayerName("widgets"),
        ];

        const report = await eslint.lintText(wrongImports.join('\n'), {
            filePath: "src/widgets/mock/index.js",
        });

        assert.strictEqual(report[0].errorCount, wrongImports.length);
    });

    it("should lint with cross-import errors between features.", async () => {
        const wrongImports = [
            getRandomImportByLayerName("features"),
            getRandomImportByLayerName("features"),
        ];

        const report = await eslint.lintText(wrongImports.join('\n'), {
            filePath: "src/features/mock/index.js",
        });

        assert.strictEqual(report[0].errorCount, wrongImports.length);
    });

    it("should lint with cross-import errors between entities.", async () => {
        const wrongImports = [
            getRandomImportByLayerName("entities"),
            getRandomImportByLayerName("entities"),
        ];

        const report = await eslint.lintText(wrongImports.join('\n'), {
            filePath: "src/entities/mock/index.js",
        });

        assert.strictEqual(report[0].errorCount, wrongImports.length);
    });

    it("should lint with cross-import errors between shared.", async () => {
        const wrongImports = [
            getRandomImportByLayerName("shared"),
            getRandomImportByLayerName("shared"),
        ];

        const report = await eslint.lintText(wrongImports.join('\n'), {
            filePath: "src/shared/mock/index.js",
        });

        assert.strictEqual(report[0].errorCount, wrongImports.length);
    });
});

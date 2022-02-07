const { ESLint } = require("eslint");
const assert = require("assert");
const { configLib } = require("../../utils");
const cfg = require("./");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: configLib.setParser(
        configLib.mockImports(cfg)
    ),
});

describe("Import boundaries between layers", () => {

    describe("IDDQD boundaries", () => {
        it("should lint without errors in GodMode", async () => {
            const report = await eslint.lintText(`
            import { Routes } from "pages/_route";
            import { Config } from "processes/_config";
            `,
                {filePath: "src/entities/ui/index.js"});

            assert.strictEqual(report[0].errorCount, 0);
        });
    })

    it("should lint with cross-import errors.", async () => {
        const wrongImports = [
            `import { getRoute } from "pages/auth";`,
            `import { getStore } from "app/store";`,
        ];

        const report = await eslint.lintText(wrongImports.join("\n"), {
            filePath: "src/shared/lib/index.js",
        });
        assert.strictEqual(report[0].errorCount, wrongImports.length);
    });

    it("should lint without errors.", async () => {
        const validCodeSnippet = [
            `import { sessionModel } from "entities/session";`,
            `import { Form, Button } from "shared/ui";`,
        ].join("\n");

        const report = await eslint.lintText(validCodeSnippet, {
            filePath: "src/app/ui/app.js",
        });
        assert.strictEqual(report[0].errorCount, 0);
    });

    it("should lint without errors when import from shared.", async () => {
        const validCodeSnippet = [
            `import { API_TOKEN } from "shared/config"`,
            `import { Form } from "shared/ui";`,
        ].join("\n");

        const report = await eslint.lintText(validCodeSnippet, {
            filePath: "src/shared/ui/button.js",
        });
        assert.strictEqual(report[0].errorCount, 0);
    });

});

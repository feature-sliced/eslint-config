const { ESLint } = require("eslint");
const assert = require("assert");
const { configLib } = require("../../utils");
const cfg = require(".");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: configLib.setParser(
        configLib.mockImports(cfg)
    ),
});

describe("Import boundaries between slices and layers", () => {

    describe("IDDQD boundaries", () => {
        it("should lint without errors in GodMode", async () => {
            const report = await eslint.lintText(`
            import { System } from "pages/_system";
            import { Routes } from "pages/_route";
            `,
                {filePath: "src/pages/ui/index.js"});

            assert.strictEqual(report[0].errorCount, 0);
        });
    })

    it("should lint with cross-import errors between pages.", async () => {
        const wrongImports = [
            `import { getAuthCtx } from "pages/logout";`,
            `import { UserAvatar } from "pages/auth";`,
        ];

        const report = await eslint.lintText(wrongImports.join("\n"), {
            filePath: "src/pages/map/index.js",
        });

        assert.strictEqual(report[0].errorCount, wrongImports.length);
    });

    it("should lint with cross-import errors between widgets.", async () => {
        const wrongImports = [
            `import { HeaderTitle } from "widgets/header";`,
            `import { Links } from "widgets/footer";`,
        ];

        const report = await eslint.lintText(wrongImports.join("\n"), {
            filePath: "src/widgets/mock/index.js",
        });

        assert.strictEqual(report[0].errorCount, wrongImports.length);
    });

    it("should lint with cross-import errors between features.", async () => {
        const wrongImports = [
            `import { getAuthCtx } from "features/logout";`,
            `import { UserAvatar } from "features/viewer-picker";`,
        ];

        const report = await eslint.lintText(wrongImports.join("\n"), {
            filePath: "features/auth-form/index.js",
        });

        assert.strictEqual(report[0].errorCount, wrongImports.length);
    });

    it("should lint with cross-import errors between entities.", async () => {
        const wrongImports = [
            `import { LoginForm } from "features/login-form";`,
            `import { Avatar } from "features/avatar";`,
        ];

        const report = await eslint.lintText(wrongImports.join("\n"), {
            filePath: "src/entities/mock/index.js",
        });

        assert.strictEqual(report[0].errorCount, wrongImports.length);
    });

});

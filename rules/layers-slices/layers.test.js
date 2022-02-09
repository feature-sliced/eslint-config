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

        it("should lint without errors in GodMode for _computed entities", async () => {
            const report = await eslint.lintText(`
            import { userModel } from "entities/user";
            import { getUser } from "shared/api/user-api";
            `,
                {filePath: "src/entities/_computed/UserPost/model.js"});

            assert.strictEqual(report[0].errorCount, 0);
        });

        it("should lint with errors for computed entities", async () => {
            const report = await eslint.lintText(`
            import { userModel } from "entities/user";
            `,
                {filePath: "src/entities/computed/UserPost/model.js"});

            assert.strictEqual(report[0].errorCount, 1);
        });

        it("should lint without errors in GodMode for pages", async () => {
            const report = await eslint.lintText(`
            import { FooPage } from "pages/foo";
            import { BagFeature } from "features/bag";
            import { format } from "shared/lib/format";
            import { BarPage } from "../bar";
            `,
                {filePath: "src/pages/_router/private.routes.js"});

            assert.strictEqual(report[0].errorCount, 0);
        });

        it("should lint with errors in GodMode for upper layers", async () => {
            const report = await eslint.lintText(`
            import { MainPage } from "pages/main";
            import { UserFeature } from "features/user";
            `,
                {filePath: "src/entities/_computed/UserPost/model.js"});

            assert.strictEqual(report[0].errorCount, 2);
        });


        it("should lint without errors without GodMode for pages", async () => {
            const report = await eslint.lintText(`
            import { FooPage } from "pages/foo";
            `,
                {filePath: "src/pages/router/private.routes.js"});

            assert.strictEqual(report[0].errorCount, 1);
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

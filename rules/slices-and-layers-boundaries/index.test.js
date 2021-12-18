const { ESLint } = require("eslint");
const assert = require("assert");
const { configLib } = require("../../utils");
const cfg = require("./");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: configLib.setParser(
        configLib.mockImports(cfg),
    ),
});

describe("Slices and Layers config:", () => {

    describe("Layers:", () => {
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
    });

    describe("Slices:", () => {
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

        it("should lint with cross-import errors between widgets.",
            async () => {
                const wrongImports = [
                    `import { HeaderTitle } from "widgets/header";`,
                    `import { Links } from "widgets/footer";`,
                ];

                const report = await eslint.lintText(wrongImports.join("\n"), {
                    filePath: "src/widgets/mock/index.js",
                });

                assert.strictEqual(report[0].errorCount, wrongImports.length);
            });

        it("should lint with cross-import errors between features.",
            async () => {
                const wrongImports = [
                    `import { getAuthCtx } from "features/logout";`,
                    `import { UserAvatar } from "features/viewer-picker";`,
                ];

                const report = await eslint.lintText(wrongImports.join("\n"), {
                    filePath: "src/features/auth-form/index.js",
                });

                assert.strictEqual(report[0].errorCount, wrongImports.length);
            });

        it("should lint with cross-import errors between entities.",
            async () => {
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
});
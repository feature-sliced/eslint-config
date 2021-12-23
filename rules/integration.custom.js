const { ESLint } = require("eslint");
const assert = require("assert");
const { configLib } = require("../utils");

describe("Integration Custom configs tests:", () => {

    describe("With custom recommended rules: ", () => {

        const cfg = {
            parserOptions: {
                "ecmaVersion": "2015",
                "sourceType": "module",
            },
            extends: [
                "./layers-slices",
                "./public-api",
                "./import-order",
            ].map(require.resolve),
        };

        const eslint = new ESLint({
            useEslintrc: false,
            baseConfig: configLib.mockImports(cfg),
        });

        it("Custom config should lint with errors", async () => {
            const report = await eslint.lintText(`
            import { getSmth } from "./lib"; // import-order
            import axios from "axios";
            import { data } from "../fixtures"; // import-order
            import { authModel } from "entities/auth"; // import-order
            import { Button } from "shared/ui"; // import-order
            import { LoginForm } from "features/login-form"; // import-order
            import { Header } from "widgets/header"; // import-order, import-boundaries
            import { debounce } from "shared/lib/fp"; // import-order
            import { AuthPage } from "pages/auth"; // import-boundaries
            import { IssueDetails } from "widgets/issue-details/ui/details"; // import-order, publicAPI
            `, {
                filePath: "src/widgets/mock/index.js",
            });
            assert.strictEqual(report[0].errorCount, 11);
        });

        it("Custom config should lint without errors", async () => {
            const report = await eslint.lintText(`
            import { getRoute } from "pages/auth";
            import { Header } from "widgets/header";
            import { LoginForm } from "features/login-form";
            import { Phone } from "features/login-form/phone";
            import { Article } from "entities/article";
            import { Button } from "shared/ui/button";
            import { LoginAPI } from "shared/api";
            import { model } from "../model";
            import { styles } from "./styles.module.scss";
            `, { filePath: "src/app/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 0);
        });

        it("Custom config should lint only with import-order error", async () => {
            const report = await eslint.lintText(`
            import { LoginAPI } from "shared/api";
            import { getRoute } from "pages/auth";
            `, { filePath: "src/app/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 1);
        });

        it("Custom config should lint only with layer error", async () => {
            const report = await eslint.lintText(`
            import { LoginForm } from "features/login-form";
            `, { filePath: "src/entities/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 1);
        });

        it("Custom config should lint only with slice error", async () => {
            const report = await eslint.lintText(`
            import { Article } from "entities/article";
            `, { filePath: "src/entities/avatar/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 1);
        });

        it("Custom config should lint only with PublicAPI error", async () => {
            const report = await eslint.lintText(`
            import { orderModel } from "entities/order/model";
            `, { filePath: "src/features/profile/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 1);
        });
    })

    describe("Without publicAPI: ", () => {

        const cfg = {
            parserOptions: {
                "ecmaVersion": "2015",
                "sourceType": "module",
            },
            extends: [
                "./layers-slices",
                "./import-order",
            ].map(require.resolve),
        };

        const eslint = new ESLint({
            useEslintrc: false,
            baseConfig: configLib.mockImports(cfg),
        });

        it("Custom config should lint with errors", async () => {
            const report = await eslint.lintText(`
            import { getSmth } from "./lib"; // import-order
            import axios from "axios";
            import { data } from "../fixtures"; // import-order
            import { authModel } from "entities/auth"; // import-order
            import { Button } from "shared/ui"; // import-order
            import { LoginForm } from "features/login-form"; // import-order
            import { Header } from "widgets/header"; // import-order, import-boundaries
            import { debounce } from "shared/lib/fp"; // import-order
            import { AuthPage } from "pages/auth"; // import-boundaries
            `, {
                filePath: "src/widgets/mock/index.js",
            });
            assert.strictEqual(report[0].errorCount, 9);
        });

        it("Custom config should lint without errors", async () => {
            const report = await eslint.lintText(`
            import { getRoute } from "pages/auth";
            import { Header } from "widgets/header";
            import { LoginForm } from "features/login-form";
            import { Phone } from "features/login-form/phone";
            import { Article } from "entities/article";
            import { Button } from "shared/ui/button";
            import { LoginAPI } from "shared/api";
            import { model } from "../model";
            import { styles } from "./styles.module.scss";
            `, { filePath: "src/app/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 0);
        });

        it("Custom config should lint only with import-order error", async () => {
            const report = await eslint.lintText(`
            import { LoginAPI } from "shared/api";
            import { getRoute } from "pages/auth";
            `, { filePath: "src/app/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 1);
        });

        it("Custom config should lint only with layer error", async () => {
            const report = await eslint.lintText(`
            import { LoginForm } from "features/login-form";
            `, { filePath: "src/entities/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 1);
        });

        it("Custom config should lint only with slice error", async () => {
            const report = await eslint.lintText(`
            import { Article } from "entities/article";
            `, { filePath: "src/entities/avatar/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 1);
        });

    })

    describe("Without import-order: ", () => {

        const cfg = {
            parserOptions: {
                "ecmaVersion": "2015",
                "sourceType": "module",
            },
            extends: [
                "./public-api",
                "./layers-slices",
            ].map(require.resolve),
        };

        const eslint = new ESLint({
            useEslintrc: false,
            baseConfig: configLib.mockImports(cfg),
        });

        it("Custom config should lint with errors", async () => {
            const report = await eslint.lintText(`
            import { getSmth } from "./lib";
            import axios from "axios";
            import { data } from "../fixtures";
            import { authModel } from "entities/auth";
            import { Button } from "shared/ui";
            import { LoginForm } from "features/login-form"; 
            import { Header } from "widgets/header"; // import-boundaries
            import { debounce } from "shared/lib/fp"; 
            import { AuthPage } from "pages/auth"; // import-boundaries
            import { IssueDetails } from "widgets/issue-details/ui/details"; // import-boundaries, publicAPI
            `, {
                filePath: "src/widgets/mock/index.js",
            });

            assert.strictEqual(report[0].errorCount, 4);
        });

        it("Custom config should lint without errors", async () => {
            const report = await eslint.lintText(`
            import { getRoute } from "pages/auth";
            import { Header } from "widgets/header";
            import { LoginForm } from "features/login-form";
            import { Phone } from "features/login-form/phone";
            import { Article } from "entities/article";
            import { Button } from "shared/ui/button";
            import { LoginAPI } from "shared/api";
            import { model } from "../model";
            import { styles } from "./styles.module.scss";
            `, { filePath: "src/app/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 0);
        });

        it("Custom config should lint only with layer error", async () => {
            const report = await eslint.lintText(`
            import { LoginForm } from "features/login-form";
            `, { filePath: "src/entities/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 1);
        });

        it("Custom config should lint only with slice error", async () => {
            const report = await eslint.lintText(`
            import { Article } from "entities/article";
            `, { filePath: "src/entities/avatar/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 1);
        });

        it("Custom config should lint only with PublicAPI error", async () => {
            const report = await eslint.lintText(`
            import { orderModel } from "entities/order/model";
            `, { filePath: "src/features/profile/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 1);
        });
    })

    describe("Without layers-slice, but with layers: ", () => {

        const cfg = {
            parserOptions: {
                "ecmaVersion": "2015",
                "sourceType": "module",
            },
            extends: [
                "./public-api",
                "./import-order",
                "./layers",
            ].map(require.resolve),
        };

        const eslint = new ESLint({
            useEslintrc: false,
            baseConfig: configLib.mockImports(cfg),
        });

        it("Custom config should lint with errors", async () => {
            const report = await eslint.lintText(`
            import { getSmth } from "./lib"; // import-order
            import axios from "axios";
            import { authProcess } from "processes/auth-process"; // layers
            import { data } from "../fixtures"; // import-order
            import { authModel } from "entities/auth"; // import-order
            import { Button } from "shared/ui"; // import-order
            import { LoginForm } from "features/login-form"; // import-order
            import { Header } from "widgets/header"; // import-order
            import { debounce } from "shared/lib/fp"; // import-order
            import { AuthPage } from "pages/auth"; // layers
            import { IssueDetails } from "widgets/issue-details/ui/details"; // publicAPI
            `, {
                filePath: "src/widgets/mock/index.js",
            });

            assert.strictEqual(report[0].errorCount, 10);
        });

        it("Custom config should lint without errors", async () => {
            const report = await eslint.lintText(`
            import { getRoute } from "pages/auth";
            import { Header } from "widgets/header";
            import { LoginForm } from "features/login-form";
            import { Phone } from "features/login-form/phone";
            import { Article } from "entities/article";
            import { Button } from "shared/ui/button";
            import { LoginAPI } from "shared/api";
            import { model } from "../model";
            import { styles } from "./styles.module.scss";
            `, { filePath: "src/app/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 0);
        });

        it("Custom config should lint only with import-order error", async () => {
            const report = await eslint.lintText(`
            import { LoginAPI } from "shared/api";
            import { getRoute } from "pages/auth";
            `, { filePath: "src/app/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 1);
        });

        it("Custom config should lint only with layer error", async () => {
            const report = await eslint.lintText(`
            import { LoginForm } from "features/login-form";
            `, { filePath: "src/entities/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 1);
        });

        it("Custom config should lint only with PublicAPI error", async () => {
            const report = await eslint.lintText(`
            import { orderModel } from "entities/order/model";
            `, { filePath: "src/features/profile/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 1);
        });
    })
});

const { ESLint } = require("eslint");
const assert = require("assert");
const { configLib } = require("../utils");
const cfg = require("../");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: configLib.mockImports(cfg),
});

describe("Integration tests:", () => {
    it("Global config should lint with errors", async () => {
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

    it("Global config should lint without errors", async () => {
        const report = await eslint.lintText(`
        import { getRoute } from "pages/auth";
        import { Header } from "widgets/header";
        import { LoginForm } from "features/login-form";
        import { Phone } from "features/login-form/phone";
        import { Article } from "entities/article";
        import { LoginAPI } from "shared/api";
        import { Button } from "shared/ui/button";
        import { model } from "../model";
        import { styles } from "./styles.module.scss";
        `, { filePath: "src/app/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 0);
    });

    it("Global config should lint only with import-order error", async () => {
        const report = await eslint.lintText(`
        import { LoginAPI } from "shared/api";
        import { getRoute } from "pages/auth";
        `, { filePath: "src/app/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 1);
    });

    it("Global config should lint only with layer error", async () => {
        const report = await eslint.lintText(`
        import { LoginForm } from "features/login-form";
        `, { filePath: "src/entities/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 1);
    });

    it("Global config should lint only with slice error", async () => {
        const report = await eslint.lintText(`
        import { Article } from "entities/article";
        `, { filePath: "src/entities/avatar/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 1);
    });

    it("Global config should lint only with PublicAPI error", async () => {
        const report = await eslint.lintText(`
        import { orderModel } from "entities/order/model";
        `, { filePath: "src/features/profile/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 1);
    });

    it("Global config should pass with global node_modules", async () => {
        const report = await eslint.lintText(`
        import { orderModel } from "home/work/npm/node_modules/packages/custom/ci/index.js";
        import { Something } from "home/work/npm/node_modules/packages/fancy-ui-kiy/some/index.js";
        import { useDelay } from "home/work/npm/node_modules/packages/reduxium/use-delay/index.js";
        `, { filePath: "src/features/profile/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 0);
    });
});

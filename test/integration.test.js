const { ESLint } = require("eslint");
const assert = require("assert");
const { mockImports } = require("../utils/config");
const cfg = require("../");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: mockImports(cfg),
});

describe("Integration tests:", () => {
    it("Global config should lint with errors", async () => {
        const report = await eslint.lintText(`
        import { getSmth } from "./lib"; // import-order
        import axios from "axios";
        import { data } from "../fixtures"; // import-order
        import { authModel } from "entities/auth"; 
        import { Button } from "shared/ui"; // import-order
        import { LoginForm } from "features/login-form"; // import-order
        import { Header } from "widgets/header"; // import-order, import-boundaries
        import { debounce } from "shared/lib/fp";
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
        import { Button } from "shared/ui/button";
        import { LoginAPI } from "shared/api";
        import { model } from "../model";
        import { styles } from "./styles.module.scss";
        `, { filePath: "src/app/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 0);
    });
});

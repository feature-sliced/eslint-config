const { ESLint } = require("eslint");
const assert = require("assert");
const { setConfigParser } = require("../../utils/config");
const cfg = require("./");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: setConfigParser(cfg),
});

describe("Import order:", () => {

    it("should lint with errors.", async () => {
        const report = await eslint.lintText(`
        import { getSmth } from "./lib"; // 1
        import axios from "axios";
        import { data } from "../fixtures"; // 2
        import { authModel } from "entities/auth"; 
        import { Button } from "shared/ui"; // 3
        import { LoginForm } from "features/login-form"; // 4
        import { Header } from "widgets/header"; // 5
        import { debounce } from "shared/lib/fp";
        `);

        assert.strictEqual(report[0].errorCount, 5);
    });

    it("should lint without errors.", async () => {
        const report = await eslint.lintText(`
        import axios from "axios";                           // 1) external libs
        import { Header } from "widgets/header";             // 2.1) Layers: widgets
        import { LoginForm } from "features/login-form";     // 2.2) Layers: features
        import { authModel } from "entities/auth";           // 2.3) Layers: entities
        import { Button } from "shared/ui";                  // 2.4) Layers: shared
        import { debounce } from "shared/lib/fp";            // 2.4) Layers: shared
        import { data } from "../fixtures";                  // 3) parent
        import { getSmth } from "./lib";                     // 4) sibling
        `);

        assert.strictEqual(report[0].errorCount, 0);
    });
});

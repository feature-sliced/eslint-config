const {ESLint} = require("eslint");
const assert = require("assert");
const cfg = require("..");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig:  cfg
})

// Should be actualized (https://github.com/feature-sliced/eslint-config/issues/17)
describe.skip("restrict imports", () => {
    it("invalid", async () => {
        const report = await eslint.lintText(`
        import { Issues } from "pages/issues";
        import { IssueDetails } from "features/issue-details"
        import { Button } from "shared/components/button";
        `);
        assert.strictEqual(report[0].errorCount, 3);
    })
    it("valid", async () => {
        const report = await eslint.lintText(`
        import Routing from "pages"; // specific pages shouldn't be reexported
        import { IssueDetails } from "features" // all features should be reexported, for usage
        import { Button } from "shared/components"; // all components should be reexported, for usage
        `);
        assert.strictEqual(report[0].errorCount, 0);
    })
})

// Should be actualized (https://github.com/feature-sliced/eslint-config/issues/17)
describe.skip("absolute imports", () => {
    it("invalid", async () => {
        const report = await eslint.lintText(`
        import Routing from "../../pages"
        import { IssueDetails } from "../features";
        import { Button } from "../shared/components";
        `);
        assert.strictEqual(report[0].errorCount, 3);
    })
    it("valid", async () => {
        const report = await eslint.lintText(`
        import Routing from "pages"
        import { IssueDetails } from "features";
        import { Button } from "shared/components";
        `);
        assert.strictEqual(report[0].errorCount, 0);
    })
})

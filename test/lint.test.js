const {ESLint} = require("eslint");
const assert = require("assert");
const cfg = require("..");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig:  cfg
})

// Should be actualized (https://github.com/feature-sliced/eslint-config/issues/17)
describe.skip("order imports", () => {
    it("invalid", async () => {
        const report = await eslint.lintText(`
        import { Helper } from "./helpers"; // 1
        import axios from "axios";
        import { data } from "../fixtures"; // 2
        import { Button } from "shared/components" // 3
        import { IssueDetails, RepoList } from "features"
        import { debounce } from "shared/helpers"
        `);
        assert.strictEqual(report[0].errorCount, 3);
    })
    it("valid", async () => {
        const report = await eslint.lintText(`
        import axios from "axios"; // 1) external libs
        import { IssueDetails, RepoList } from "features" // 2) features
        import { Button } from "shared/components" // 3) shared/**
        import { debounce } from "shared/helpers"
        import { data } from "../fixtures"; // 4) parent
        import { Helper } from "./helpers"; // 5) sibling
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

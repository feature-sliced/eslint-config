const { ESLint } = require("eslint");
const assert = require("assert");
const cfg = require("..");
const { lintProject } = require("./utils");
const eslint = new ESLint({
    useEslintrc: false,
    // @ts-ignore
    baseConfig: cfg,
})

describe("lint projects", () => {
    it('should lint js project with errors', async () => {
        const { stdout } = await lintProject('js');
        assert.notStrictEqual(stdout.match(/error/ig).length, 0);
    })
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
        `, {filePath: "src/hello.js"});
        assert.strictEqual(report[0].errorCount, 0);
    })
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
        `, {filePath: "src/hello.js"});
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

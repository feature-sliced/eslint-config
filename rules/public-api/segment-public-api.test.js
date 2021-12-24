const { ESLint } = require("eslint");
const assert = require("assert");
const { configLib } = require("../../utils");
const cfg = require(".");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: configLib.setParser(
        configLib.mockImports(cfg),
    ),
});

describe("Segment PublicAPI:", () => {
    it("Should lint Segment PublicAPI boundaries with errors.", async () => {
        const report = await eslint.lintText(`
        export { SubmitButton } from "./ui/button";
        export { SmthForm } from "./ui/form";
        export * from "./model/actions";
        export { selectSmthById } from "./model/selectors";
        `,
            { filePath: "src/features/smth/index.ts" });
        assert.strictEqual(report[0].errorCount, 4);
    });

    it("Should lint Segment PublicAPI boundaries without errors.", async () => {
        const report = await eslint.lintText(`
        export { SubmitButton, SmthForm } from "./ui";
        export * from "./model";
        export { selectSmthById, selectSmthByName } from "./model";        
        `, { filePath: "src/features/smth/index.ts" });

        assert.strictEqual(report[0].errorCount, 0);
    });

});

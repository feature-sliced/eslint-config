const assert = require("assert");
const { lintFileInProject } = require("./utils");

const testFiles = {
    layersError: "fixtures/js/src/shared/layers-error/ui/index.js",
    layersTSError: "fixtures/ts/src/shared/layers-error/ui/index.tsx",
    slicesError: "fixtures/js/src/shared/slices-error/ui/index.js",
    slicesTSError: "fixtures/ts/src/shared/slices-error/ui/index.tsx",
    appGood: "fixtures/js/src/app/index.js",
    appTSGood: "fixtures/ts/src/app/index.js"
}

describe("import boundaries", () => {
    it("should lint js/entities/layers-error/index.js with layers errors", async () => {
        const { stdout } = await lintFileInProject(testFiles.layersError, "js");
        assert.strictEqual(stdout.match(/boundaries\/element-types/gi).length, 6);
    });

    it("should lint js/entities/slices-error/index.js with slice error", async () => {
        const { stdout } = await lintFileInProject(testFiles.slicesError, "js");
        assert.strictEqual(stdout.match(/boundaries\/element-types/gi).length, 1);
    });

    it("should lint ts/entities/layers-error/index.tsx with layers errors", async () => {
        const { stdout } = await lintFileInProject(testFiles.layersTSError, "ts");
        assert.strictEqual(stdout.match(/boundaries\/element-types/gi).length, 6);
    });

    it("should lint ts/entities/slices-error/index.tsx with slice error", async () => {
        const { stdout } = await lintFileInProject(testFiles.slicesTSError, "ts");
        assert.strictEqual(stdout.match(/boundaries\/element-types/gi).length, 1);
    });

    it("should lint js/app/index.jsx without import boundaries errors", async () => {
        const { stdout } = await lintFileInProject(testFiles.appGood, "js");
        assert.strictEqual(stdout.match(/boundaries\/element-types/gi), null);
    });

    it("should lint ts/app/index.tsx without import boundaries errors", async () => {
        const { stdout } = await lintFileInProject(testFiles.appTSGood, "ts");
        assert.strictEqual(stdout.match(/boundaries\/element-types/gi), null);
    });
});

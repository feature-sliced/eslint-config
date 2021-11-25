const assert = require("assert");
const path = require("path");
const { lintFileInProject } = require("./utils");

const layersErrorFilePath = path.resolve(
    __dirname,
    "fixtures/js/src/shared/layers-error/ui/index.js"
);
const slicesErrorFilePath = path.resolve(
    __dirname,
    "fixtures/js/src/shared/slices-error/ui/index.js"
);

describe("import boundaries", () => {
    it("should lint js/entities/layers-error/index.js with layers errors", async () => {
        const { stdout } = await lintFileInProject(layersErrorFilePath, "js");
        assert.strictEqual(stdout.match(/boundaries\/element-types/gi).length, 6);
    });

    it("should lint js/entities/slices-error/index.js with slice error", async () => {
        const { stdout } = await lintFileInProject(slicesErrorFilePath, "js");
        assert.strictEqual(stdout.match(/boundaries\/element-types/gi).length, 1);
    });
});

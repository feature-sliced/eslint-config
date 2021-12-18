const { configLib } = require("../../utils");
const slicesBoundaries = require("../slices-boundaries");
const layersBoundaries = require("../layers-boundaries");

describe("Slices and Layers config:", () => {

    it("slices and layers should be correct combined", () => {
        console.log(JSON.stringify(
            configLib.combineConfigs([slicesBoundaries, layersBoundaries]),
            null, 4));
    });
});
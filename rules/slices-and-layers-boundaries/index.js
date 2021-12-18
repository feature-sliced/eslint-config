const slicesBoundaries = require("../slices-boundaries");
const layersBoundaries = require("../layers-boundaries");
const { configLib } = require("../../utils");

module.exports = configLib.mergeConfigs(layersBoundaries, slicesBoundaries);
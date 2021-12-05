const isArray = (val) => Array.isArray(val);
const isObj = (val) => typeof val === "object" && val !== null;
const isString = (val) => typeof val === "string";
const isNumber = (val) => typeof val === "number";
const isOptional = (val) => val === undefined;

const a = 97;
const z = 122;

const getRandomImportByLayerName = (layerName, length = 8) => {
    const charCodes = Array.from({ length }, () => Math.random() * (z - a) + a);
    const sliceName = String.fromCharCode(...charCodes);
    return `import { ${sliceName[0].toUpperCase() + sliceName.slice(1)} } from "${layerName}/${sliceName}";\n`;
}

module.exports = {
    isArray,
    isObj,
    isString,
    isNumber,
    isOptional,
    getRandomImportByLayerName
};

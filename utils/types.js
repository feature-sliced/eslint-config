const isArray = (val) => Array.isArray(val);
const isObj = (val) => typeof val === "object" && val !== null;
const isString = (val) => typeof val === "string";
const isNumber = (val) => typeof val === "number";
const isOptional = (val) => val === undefined;

module.exports.typesLib = {
    isArray,
    isObj,
    isString,
    isNumber,
    isOptional,
};

const assert = require("assert");
const cfg = require("../");
const utils = require("./utils");

describe("config is valid", () => {
    it("plugins ~ Array", () => {
        assert.ok(utils.isArray(cfg.plugins));
    })
    it("rules ~ Object", () => {
        assert.ok(utils.isObj(cfg.rules));
    })
    it("rules ~ Record<string, Options>", () => {
        Object.entries(cfg.rules).forEach(([ruleName, ruleOptions]) => {
            assert.ok(utils.isString(ruleName));
            assert.ok(
                utils.isNumber(ruleOptions) || 
                utils.isArray(ruleOptions) || 
                utils.isObj(ruleOptions)
            );
        })
    })
    // TODO: eslint.isValid
    // NOTE: maybe will need... in future...
    // t.ok(isObject(config.parserOptions))
    // t.ok(isObject(config.env))
    // t.ok(isObject(config.globals))
    // t.ok(isObject(config.rules))
});

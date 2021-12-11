const assert = require("assert");
const cfg = require("../");
const utils = require("./utils/tools");

describe("config is valid", () => {
    it("parserOptions ~ Record<string, string>", () => {
        assert.ok(utils.isObj(cfg.parserOptions));
        Object.entries(cfg.parserOptions).forEach(([key, value]) => {
            assert.ok(utils.isString(key));
            assert.ok(utils.isString(value));
        })
    })
    // FIXME: Recursive plugin parsing
    it.skip("plugins ~ Array", () => {
        assert.ok(utils.isArray(cfg.plugins));
    })
    it.skip("rules ~ Record<string, Options>", () => {
        assert.ok(utils.isObj(cfg.rules));
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

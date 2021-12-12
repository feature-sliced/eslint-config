const assert = require("assert");
const { utils } = require("../utils");
const cfg = require("../");

describe("config is valid", () => {
    it("Valid parerOptions should presented in global config.", () => {
        assert.ok(utils.isObj(cfg.parserOptions));
        Object.entries(cfg.parserOptions).forEach(([key, value]) => {
            assert.ok(utils.isString(key));
            assert.ok(utils.isString(value));
        });
    });

    it("Global config should extends other config.", () => {
        assert.ok(utils.isArray(cfg.extends));
    });

    it("All extended configs should be presented.", () => {
        cfg.extends.forEach((configPath) => {
            const config = require(configPath);
            assert.ok(config);
        });
    });

    it("All extended configs plugins should be presented as Array's", () => {
        cfg.extends.forEach((configPath) => {
            const config = require(configPath);
            assert.ok(utils.isArray(config.plugins));
        });
    });

    it("All extended configs rules should be with name and value", () => {
        cfg.extends.forEach((configPath) => {
            const config = require(configPath);
            assert.ok(utils.isObj(config.rules));
            Object.entries(config.rules).forEach(([ruleName, ruleOptions]) => {
                assert.ok(utils.isString(ruleName));
                assert.ok(
                    utils.isNumber(ruleOptions) ||
                    utils.isArray(ruleOptions) ||
                    utils.isObj(ruleOptions),
                );
            });
        });
    });
    // TODO: eslint.isValid
    // NOTE: maybe will need... in future...
    // t.ok(isObject(config.parserOptions))
    // t.ok(isObject(config.env))
    // t.ok(isObject(config.globals))
    // t.ok(isObject(config.rules))
});

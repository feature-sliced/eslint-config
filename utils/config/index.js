const path = require("path");
const { typesLib } = require("../types");
const { isArray } = require("eslint-plugin-boundaries/src/helpers/utils");

const mockImports = (config, extension = "js") => {
    return {
        ...config,
        settings: {
            ...config.settings,
            "import/resolver": {
                [path.resolve(__dirname, "./mock-resolver.js")]: {
                    extension,
                },
            },
        },
    };
};

function setParser (config, version = "2015") {
    return {
        ...config,
        parserOptions: {
            "ecmaVersion": version,
            "sourceType": "module",
        },
    };
}

function setTSParser (config) {
    return {
        ...config,
        parser: "@typescript-eslint/parser",
    };
}

function mergeConfigs (...configs) {
    return configs.reduce((prev, cur) => {
        Object.keys(cur).forEach(key => {
            const previous = prev[key];
            const current = cur[key];

            if (typesLib.isArray(previous) && typesLib.isArray(current)) {
                prev[key] = Array.from(new Set([...previous, ...current]));
            } else if (typesLib.isObj(previous) && typesLib.isObj(current)) {
                prev[key] = mergeConfigs(previous, current);
            } else {
                prev[key] = current;
            }
        });

        return prev;
    }, {});
}

module.exports.configLib = {
    mockImports,
    setParser,
    setTSParser,
    mergeConfigs,
};

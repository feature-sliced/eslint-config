const path = require("path");

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
        }
    }
}

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

module.exports.configLib = { mockImports, setParser, setTSParser };

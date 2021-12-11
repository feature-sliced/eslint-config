const path = require("path");

const mockImports = (config, extension = 'js') => {
    return  {
        ...config,
        settings: {
            ...config.settings,
            'import/resolver': {
                [path.resolve(__dirname, './mock-resolver.js')]: {
                    extension
                }
            },
        }
    }
}

function setConfigParser (config, version = "2015") {
    return {
        ...config,
        parserOptions: {
            "ecmaVersion": version,
            "sourceType": "module",
        },
    };
}

module.exports = { mockImports, setConfigParser };

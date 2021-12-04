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

module.exports = { mockImports };

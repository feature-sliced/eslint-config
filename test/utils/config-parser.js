function setConfigParser (config, version = "2015") {
    return {
        ...config,
        parserOptions: {
            "ecmaVersion": version,
            "sourceType": "module",
        },
    };
}

module.exports = { setConfigParser };

const interfaceVersion = 2;

function resolve (source, file, settings) {
    return { found: true, path: `${source}/index.${settings.extension}` };
}

module.exports = { interfaceVersion, resolve };

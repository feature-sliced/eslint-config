/* Used by import/boundaries plugin for configure parser version */
const interfaceVersion = 2;

function resolve (source, file, settings) {
    return { found: true, path: `${source}/index.${settings.extension}` };
}

module.exports = { interfaceVersion, resolve };

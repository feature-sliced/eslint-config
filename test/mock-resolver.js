exports.interfaceVersion = 2;

exports.resolve = function (source, file, settings) {
    return { found: true, path: `${source}/index.${settings.extension}` };
}

const pc = require("picocolors");

const log = {
    error: (text) => console.error(pc.red(text)),
    warn: (text) => console.warn(pc.yellow(text)),
    info: (text) => console.info(pc.green(text)),
};

module.exports = { log };

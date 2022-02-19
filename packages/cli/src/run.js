const { log } = require("./log");
const { spawnSync } = require("child_process");

function runCmdFactory(cmd, executor) {
    return async function (cmdArgs) {
        executor.call(null, [cmd, cmdArgs]);
    };
}

async function exec(cmd, pkgManager = null) {
    if (!pkgManager) {
        log.error("No one package manager found in cmd scope!");
        return;
    }

    log.info(`Install ${cmd.slice(-1)}`);

    try {
        const childProcess = await spawnSync(pkgManager, [...cmd], { shell: true });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { exec, runCmdFactory };

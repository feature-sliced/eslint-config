const { log } = require("./log");
const { spawnSync } = require("child_process");
const { PkgMangers, withPkgManager } = require("./packages");

function runCmdFactory(cmd, executor) {
    return function (cmdArgs) {
        executor.call(null, [cmd, cmdArgs]);
    };
}

function exec(cmd, pkgManager = null) {
    if (!pkgManager) {
        log.error("No one package manager found in cmd scope!");
        return;
    }

    log.info(`Install ${cmd.slice(-1)}`);

    try {
        const spawnResultBuffer = spawnSync(pkgManager, [...cmd], {
            shell: true,
        });
    } catch (error) {
        console.error(error);
    }
}

function installCmdBuilder(userPkgManager) {
    const installCmd = PkgMangers[userPkgManager].install;
    const userExec = withPkgManager(exec, userPkgManager);
    return runCmdFactory(installCmd, userExec);
}

function installDependencies(installFn, dependencies, dev = true) {
    Object.keys(dependencies).forEach((dep) => {
        const version = dependencies[dep] && `@${dependencies[dep]}`;
        installFn(`${dev && "-D "}${dep + version}`);
    });
}

module.exports = { exec, installDependencies, installCmdBuilder };

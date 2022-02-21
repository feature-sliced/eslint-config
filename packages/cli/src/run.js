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
    const depsString = Object.keys(dependencies).reduce((result, dep) => {
        const version = dependencies[dep] && `@${dependencies[dep]}`;
        return `${result} "${dep + version}"`;
    }, "");

    const installArgs = `${dev && "-D"}${depsString}`;

    installFn(installArgs);
}

module.exports = { exec, installDependencies, installCmdBuilder };
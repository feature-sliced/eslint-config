const meow = require("meow");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const cli = meow("hello", {});
const __DEBUG__ = false;

const PkgMangers = {
    npm: { lock: "package-lock.json", install: "install" },
    yarn: { lock: "yarn.lock", install: "add" },
    pnpm: { lock: "pnpm.lock", install: "install" },
};

function getPkgMangerType() {
    const pkgManagersNames = Object.keys(PkgMangers);

    const selectedPkgManagers = pkgManagersNames.reduce((result, pkgManager) => {
        const pkgManagerPath = path.resolve(PkgMangers[pkgManager].lock);

        try {
            const exist = fs.existsSync(pkgManagerPath);
            if (exist) return [...result, pkgManager];
        } catch (error) {}

        return result;
    }, []);

    if (selectedPkgManagers.length === 0) {
        console.error("Something wrong! No one package manager found in project! Stopped!");
        return null;
    }

    if (selectedPkgManagers.length > 1) {
        console.error("Something wrong! Find more the one package manager in project! Stopped!");
        return null;
    }

    return selectedPkgManagers[0];
}

function withPkgManager(cmdExecutor, pkgManager) {
    return async function () {
        cmdExecutor.call(null, ...arguments, pkgManager);
    };
}

async function exec(cmd, pkgManager = null) {
    if (!pkgManager) {
        console.error("No one package manager found in cmd scope!");
        return;
    }

    if (__DEBUG__) {
        console.log(`Exec ${cmd}, with ${pkgManager}`);
    }

    console.log(`Install ${cmd.slice(-1)}`);

    try {
        const childProcess = await spawnSync(pkgManager, [...cmd], { shell: true });
    } catch (error) {
        console.error(error);
    }
}

function getPeerDependencies() {
    const { pkg } = meow(null, {});
    return pkg.peerDependencies;
}

function runCmdBuilder(cmd, executor) {
    return async function (cmdArgs) {
        executor.call(null, [cmd, cmdArgs]);
    };
}

async function installPeerDependencies(installFn) {
    const peerDependencies = getPeerDependencies();
    Object.keys(peerDependencies).forEach(async (dep) =>
        installFn(`${dep}@${peerDependencies[dep]}`),
    );
}

async function bootstrap() {
    const userPkgManager = getPkgMangerType();
    const installCmd = PkgMangers[userPkgManager].install;
    const userExec = withPkgManager(exec, userPkgManager);
    console.log(`Found ${userPkgManager}. Start install dependencies.`);

    const runInstall = runCmdBuilder(installCmd, userExec);
    await installPeerDependencies(runInstall);
}

bootstrap();

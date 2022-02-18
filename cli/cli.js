const meow = require("meow");
const { log } = require("./log");
const { withPkgManager, getPkgManger, PkgMangers } = require("./packages");
const _ = require("lodash");
const { runCmdFactory, exec } = require("./run");

const cli = meow(null, {});

const basicPackages = {
    "@feature-sliced/eslint-config": "",
};

const depsPackages = {
    "eslint-plugin-boundaries": "2.8.0",
    "eslint-plugin-import": "2.25.4",
};

const typescriptDeps = {
    "@typescript-eslint/eslint-plugin": "",
    "@typescript-eslint/parser": "",
    "eslint-import-resolver-typescript": "",
};

function isTypeScriptProject(userDeps) {
    return Object.keys(userDeps).reduce((result, dep) => {
        if (dep.includes("@types/") || dep.includes("typescript")) {
            return true;
        }
        return result;
    }, false);
}

async function installDependencies(installFn, dependencies, dev = true) {
    Object.keys(dependencies).forEach((dep) => {
        const version = dependencies[dep] && `@${dependencies[dep]}`;
        installFn(`${dev && "-D "}${dep + version}`);
    });
}

function filterInstalledDeps(installDeps, existDeps) {
    const exist = Object.keys(existDeps);
    return Object.keys(installDeps).reduce(
        (result, dep) => (exist.includes(dep) ? result : { ...result, [dep]: installDeps[dep] }),
        {},
    );
}

async function bootstrap() {
    const userPkgManager = getPkgManger();
    if (!userPkgManager) {
        return;
    }

    const userDeps = _.merge(cli.pkg.dependencies, cli.pkg.devDependencies);

    const installCmd = PkgMangers[userPkgManager].install;
    const userExec = withPkgManager(exec, userPkgManager);
    log.info(`Found ${userPkgManager}. Start install missing dependencies.`);

    const runInstall = runCmdFactory(installCmd, userExec);
    const installDeps = filterInstalledDeps(depsPackages, userDeps);

    await installDependencies(runInstall, installDeps);
    await installDependencies(runInstall, basicPackages);

    if (isTypeScriptProject(userDeps)) {
        await installDependencies(runInstall, typescriptDeps);
    }
}

bootstrap();

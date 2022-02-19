const meow = require("meow");
const { log } = require("./log");
const { withPkgManager, getPkgManger, PkgMangers } = require("./packages");
const { ui } = require("./ui");
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

function installCmdBuilder(userPkgManager) {
    const installCmd = PkgMangers[userPkgManager].install;
    const userExec = withPkgManager(exec, userPkgManager);
    return runCmdFactory(installCmd, userExec);
}

function getUserDeps(cli) {
    return _.merge(cli.pkg.dependencies, cli.pkg.devDependencies);
}

function bootstrap({ withTs = true, force = true }) {
    log.info("@feature-sliced/eslint-config/cli");

    const userDeps = getUserDeps(cli);

    const userPkgManager = getPkgManger();
    if (!userPkgManager) {
        return;
    }
    log.info(`Found ${userPkgManager}. Start install missing dependencies.`);

    const runInstall = installCmdBuilder(userPkgManager);
    const installDeps = force ? depsPackages : filterInstalledDeps(depsPackages, userDeps);

    installDependencies(runInstall, installDeps);
    installDependencies(runInstall, basicPackages);

    if (withTs) {
        log.info(`Typescript project detected!`);
        installDependencies(
            runInstall,
            force ? typescriptDeps : filterInstalledDeps(typescriptDeps, userDeps),
        );
    }
}

ui(bootstrap, isTypeScriptProject(getUserDeps(cli)));

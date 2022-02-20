const meow = require("meow");
const { log } = require("./log");
const { withPkgManager, getPkgManger, PkgMangers } = require("./packages");
const { ui } = require("./ui");
const _ = require("lodash");
const { runCmdFactory, exec } = require("./run");

const cli = meow(null, {});

const basicPackages = {
    "@feature-sliced/eslint-config": "latest",
};

const depsPackages = {
    "eslint-plugin-boundaries": "2.8.0",
    "eslint-plugin-import": "2.25.4",
};

const typescriptDeps = {
    "@typescript-eslint/eslint-plugin": "latest",
    "@typescript-eslint/parser": "latest",
    "eslint-import-resolver-typescript": "latest",
};

function isTypeScriptProject(userDeps) {
    return Object.keys(userDeps).reduce((result, dep) => {
        if (dep.includes("@types/") || dep.includes("typescript")) {
            return true;
        }
        return result;
    }, false);
}

function installDependencies(installFn, dependencies, dev = true) {
    const depsString = Object.keys(dependencies)
        .map((dep) => {
            const version = dependencies[dep] && `@${dependencies[dep]}`;
            return dep + version;
        })
        .join(" ");

    const installArgs = `${dev && "-D "}${depsString}`;

    installFn(installArgs);
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

    installDependencies(runInstall, _.merge(installDeps, basicPackages));

    if (withTs) {
        installDependencies(
            runInstall,
            force ? typescriptDeps : filterInstalledDeps(typescriptDeps, userDeps),
        );
    }

    log.info(`Done.`);
}

ui(bootstrap, isTypeScriptProject(getUserDeps(cli)));

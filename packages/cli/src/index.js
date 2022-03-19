const fs = require("fs");
const _ = require("lodash");
const { installCmdBuilder, installDependencies } = require("./run");
const {
    getPkgManger,
    depsPackages,
    basicPackages,
    typescriptPackages,
    filterInstalledDeps,
    getUserDeps,
    isTypeScriptProject,
} = require("./packages");
const { ui } = require("./ui");
const { log } = require("./log");

const packageJsonRaw = fs.readFileSync("package.json");
const packageInfo = JSON.parse(packageJsonRaw);
const userDeps = getUserDeps(packageInfo);

function bootstrap({ withTs, force = false }) {
    if (process.env.DEBUG) console.info("Bootstraping with ts/force:", withTs, force);

    log.info("@feature-sliced/eslint-config/cli");

    const userPkgManager = getPkgManger();
    if (!userPkgManager) {
        return;
    }
    log.info(`Found ${userPkgManager}. Start install missing dependencies.`);

    const runInstall = installCmdBuilder(userPkgManager);
    const installDeps = force ? depsPackages : filterInstalledDeps(depsPackages, userDeps);
    let tsDeps = {};

    if (withTs) {
        tsDeps = force ? typescriptPackages : filterInstalledDeps(typescriptPackages, userDeps);
    }

    installDependencies(runInstall, _.merge(installDeps, basicPackages, tsDeps));

    log.info(`Done.`);
}

ui(bootstrap, isTypeScriptProject(userDeps));

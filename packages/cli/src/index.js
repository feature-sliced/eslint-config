const meow = require("meow");
const _ = require("lodash");
const { installCmdBuilder, installDependencies } = require("./run");
const {
    getPkgManger,
    depsPackages,
    basicPackages,
    typescriptPackages,
    filterInstalledDeps,
    getUserDeps,
} = require("./packages");
const { ui } = require("./ui");
const { log } = require("./log");

const cli = meow(null, {});

function bootstrap({ withTs = true, force = false }) {
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
            force ? typescriptPackages : filterInstalledDeps(typescriptPackages, userDeps),
        );
    }

    log.info(`Done.`);
}

ui(bootstrap, isTypeScriptProject(getUserDeps(cli)));

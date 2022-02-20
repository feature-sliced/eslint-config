const fs = require("fs");
const path = require("path");
const { log } = require("./log");
const _ = require("lodash");

const basicPackages = {
    "@feature-sliced/eslint-config": "latest",
};

const depsPackages = {
    "eslint-plugin-boundaries": "^2.8.0",
    "eslint-plugin-import": "^2.25.4",
};

const typescriptPackages = {
    "@typescript-eslint/eslint-plugin": "latest",
    "@typescript-eslint/parser": "latest",
    "eslint-import-resolver-typescript": "latest",
};

const PkgMangers = {
    npm: { lock: "package-lock.json", install: "install" },
    yarn: { lock: "yarn.lock", install: "add" },
    pnpm: { lock: "pnpm-lock.yaml", install: "install" },
};

function isTypeScriptProject(userDeps) {
    for (const dep of userDeps) {
        if (dep.includes("@types/") || dep.includes("typescript")) {
            return true;
        }
    }
    return false;
}

function getUserDeps(cli) {
    return _.merge(cli.pkg.dependencies, cli.pkg.devDependencies);
}

function filterInstalledDeps(installDeps, existDeps) {
    const exist = Object.keys(existDeps);
    return Object.keys(installDeps).reduce(
        (result, dep) => (exist.includes(dep) ? result : { ...result, [dep]: installDeps[dep] }),
        {},
    );
}

function getPkgManger() {
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
        log.error("Something wrong! No one package manager found in project! Stopped!");
        return null;
    }

    if (selectedPkgManagers.length > 1) {
        log.error("Something wrong! Find more then one package manager in project! Stopped!");
        return null;
    }

    return selectedPkgManagers[0];
}

function withPkgManager(cmdExecutor, pkgManager) {
    return function () {
        cmdExecutor.call(null, ...arguments, pkgManager);
    };
}

module.exports = {
    withPkgManager,
    getPkgManger,
    PkgMangers,
    basicPackages,
    depsPackages,
    typescriptPackages,
    getUserDeps,
    filterInstalledDeps,
    isTypeScriptProject,
};

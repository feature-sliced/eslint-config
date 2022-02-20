const fs = require("fs");
const path = require("path");
const { log } = require("./log");

const PkgMangers = {
    npm: { lock: "package-lock.json", install: "install" },
    yarn: { lock: "yarn.lock", install: "add" },
    pnpm: { lock: "pnpm-lock.yaml", install: "install" },
};

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

module.exports = { withPkgManager, getPkgManger, PkgMangers };

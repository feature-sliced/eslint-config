const path = require('path');
const execa = require("execa");
const isArray = (val) => Array.isArray(val);
const isObj = (val) => typeof val === "object" && val !== null;
const isString = (val) => typeof val === "string";
const isNumber = (val) => typeof val === "number";
const isOptional = (val) => val === undefined;
const eslintPath = path.resolve(__dirname, "../node_modules/.bin/eslint")

function getFullFilePath(file){
    return path.resolve(__dirname, file);
}

async function lintProject(projectName) {
    const projectPath = path.resolve(__dirname, "fixtures", projectName)
    const filesToLint = path.resolve(projectPath, "**")

    try {
        return await execa(eslintPath, [`${filesToLint}`], {
            cwd: projectPath
        })
    } catch (e) {
        return e
    }
}

async function lintFileInProject(file, projectName) {
    const projectPath = path.resolve(__dirname, "fixtures", projectName)

    try {
        return await execa(eslintPath, [`${getFullFilePath(file)}`], {
            cwd: projectPath
        })
    } catch (e) {
        return e
    }
}


module.exports = {
    isArray,
    isObj,
    isString,
    isNumber,
    isOptional,
    lintProject,
    lintFileInProject
};

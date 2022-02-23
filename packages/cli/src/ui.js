const prompts = require("prompts");
const { log } = require("./log");

const HELLO_MESSAGE = "Welcome to @feature-sliced/eslint-config installer.";
const INSTALL_MESSAGE = "Run installation?";
const TYPESCRIPT_MESSAGE =
    "Typescript detected in your project. Install additionally typescript dependencies?";

const questions = [
    {
        type: "confirm",
        name: "install",
        message: INSTALL_MESSAGE,
    },
];

const tsQuestions = [
    {
        type: "confirm",
        name: "typescript",
        message: TYPESCRIPT_MESSAGE,
    },
];

async function ui(install, typescript) {
    const usedQuestions = typescript ? [...tsQuestions, ...questions] : questions;

    log.info(HELLO_MESSAGE);

    if (process.env.DEBUG === "2") {
        install({ withTs: true, force: true });
        return;
    }

    const answers = await prompts(usedQuestions);
    if (answers.install) {
        install({ withTs: answers.typescript });
    }
}

module.exports = { ui };

// TODO: https://gist.github.com/Krakazybik/53cebb2c763305be13e31042d59a7c72#file-gistfile1-js-L31

const getRuleMessage = (msg) => {
    switch (msg.ruleId) {
        case 'import/order': {
            return {
                message: 'Broken order of imports | https://git.io/JymjI',
            }
        }
        case 'import/no-internal-modules': {
            return {
                message: 'Violated usage of modules Public API | https://git.io/Jymjf',
            }
        }
        case 'boundaries/element-types': {
            const { groups } = msg.message.match(/(?<from>"\S+").+(?<to>"\S+")/i);
            const from = groups?.from || '';
            const to = groups?.to || '';
            return {
                message: `Violated isolation between layers or slices: ${from} => ${to} | https://git.io/Jymh2`,
            }
        }
    }
}

const patchMessage = (rawMsg) => {
    const msg = getRuleMessage(rawMsg);
    if (!msg) return rawMsg;

    return { ...rawMsg, ...msg};
}

module.exports = { patchMessage };

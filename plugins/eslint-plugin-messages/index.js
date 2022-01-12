const { patchMessage } = require("./helpers");

module.exports = {
    processors: {
        "fs": {
            postprocess: function (messages, ...all) {

                console.log(messages);
                return messages[0].map((message) => {
                    return patchMessage(message);
                });
            },
            supportsAutofix: true,
        },
    },
};

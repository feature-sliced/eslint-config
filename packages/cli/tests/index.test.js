const assert = require("assert");

it("Should run with normall output", async () => {
    const run = new Promise((resolve, reject) => {
        const spawn = require("child_process").spawn;
        const command = spawn("node", ["./src/index.js"]);
        let result = "";
        command.stdout.on("data", (data) => {
            result += data.toString();
        });
        command.on("close", (_) => {
            resolve(result);
        });
        command.on("error", (error) => {
            reject(error);
        });
    });

    await assert.doesNotReject(run);

    const result = await run;

    assert.strictEqual(result.includes("Done."), true);
});

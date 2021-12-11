const { ESLint } = require("eslint");
const assert = require("assert");
const { setConfigParser, mockImports } = require("../../utils/config");
const cfg = require("./");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: setConfigParser(mockImports(cfg)),
});

describe("PublicAPI import boundaries:", () => {
    it("Should lint PublicAPI boundaries with errors.", async () => {
        const report = await eslint.lintText(`
        import { Issues } from "pages/issues/ui";
        import { IssueDetails } from "widgets/issue-details/ui/details";
        import { AuthForm } from "features/auth-form/ui/form";
        import { Button } from "shared/ui/button/button";
        import { saveOrder } from "entities/order/model/actions";
        import { orderModel } from "entities/order/model";
        import { TicketCard } from "@app/entities/ticket/ui";
        `,
            { filePath: "src/app/ui/index.js" });
        assert.strictEqual(report[0].errorCount, 7);
    });

    it("Should lint PublicAPI boundaries without errors.", async () => {
        const report = await eslint.lintText(`
        import { Issues } from "pages/issues";
        import { GoodIssues } from "@app/pages/issues";
        import { IssueDetails } from "widgets/issue-details";
        import { AuthForm } from "features/auth-form";
        import { Button } from "shared/ui/button";
        import { orderModel } from "entities/order";
        import { TicketCard } from "@/entities/ticket";
        import { FixButton } from "@app/shared/ui/fix-button";
        `, { filePath: "src/app/ui/index.js" });
        assert.strictEqual(report[0].errorCount, 0);
    });

    it("Should lint extra PublicAPI boundaries cases without errors.", async () => {
        const report = await eslint.lintText(`
        import { AuthForm } from "features/auth/form";
        import { Button } from "shared/ui";
        `, { filePath: "src/app/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 0);
    });

});

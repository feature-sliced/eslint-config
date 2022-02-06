const { ESLint } = require("eslint");
const assert = require("assert");
const { configLib } = require("../../utils");
const cfg = require("./lite");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: configLib.setParser(
        configLib.mockImports(cfg),
    ),
});

describe("Lite PublicAPI:", () => {
    it("local segments should be ignored in Lite config.", async () => {
        const report = await eslint.lintText(`
        export { SubmitButton } from "./ui/button";
        export { SmthForm } from "./ui/form";
        export * from "./model/actions";
        export { selectSmthById } from "./model/selectors";
        `,
        { filePath: "src/features/smth/index.ts" });
        assert.strictEqual(report[0].errorCount, 0);
    });

    it("should lint with errors.", async () => {
        const report = await eslint.lintText(`
        import { Button } from "../shared/ui/button/button";
        import { Date } from "../shared/lib/date/date";
        `,
        {filePath: "src/features/index.ts"});
        assert.strictEqual(report[0].errorCount, 2);
    });

    it("should lint without errors when local import in shared layer.", async () => {
        const report = await eslint.lintText(`
        import { Button } from "./button/button";
        `,
        {filePath: "src/shared/ui/index.ts"});
        assert.strictEqual(report[0].errorCount, 0);
    });

    it("should lint with error when layer import in shared layer.", async () => {
        const report = await eslint.lintText(`
        import { Button } from "shared/ui/button/button";
        `,
            {filePath: "src/shared/ui/index.ts"});
        assert.strictEqual(report[0].errorCount, 1);
    });
})

describe("Allow publicAPI for shared segments with _prefix:", () => {
    it("with _prefix should lint without errors", async () => {
        const report = await eslint.lintText(`
        import { One } from "shared/_route/one";
        import { Two } from "@shared/_note/two";
        `,
            {filePath: "src/app/ui/index.js"});
        assert.strictEqual(report[0].errorCount, 0);
    });

    it("import inner module with _prefix should lint with errors", async () => {
        const report = await eslint.lintText(`
        import { Five } from "@shared/_note/two/five";
        import { Four } from "shared/_note/three/four";
        `,
            {filePath: "src/app/ui/index.js"});
        assert.strictEqual(report[0].errorCount, 2);
    });

    it("without prefix should lint with errors", async () => {
        const report = await eslint.lintText(`
        import { One } from "shared/route/one";
        import { Two } from "@shared/note/two";
        `,
            {filePath: "src/app/ui/index.js"});
        assert.strictEqual(report[0].errorCount, 2);
    });
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
        import { TicketCard } from "@src/entities/ticket/ui";
        import { Ticket } from "@src/entities/ticket/ui.tsx";
        `,
            { filePath: "src/app/ui/index.js" });
        assert.strictEqual(report[0].errorCount, 8);
    });

    it("Should lint PublicAPI boundaries without errors.", async () => {
        const report = await eslint.lintText(`
        import { Issues } from "pages/issues";
        import { GoodIssues } from "@src/pages/issues";
        import { IssueDetails } from "widgets/issue-details";
        import { AuthForm } from "features/auth-form";
        import { Button } from "shared/ui/button";
        import { orderModel } from "entities/order";
        import { TicketCard } from "@/entities/ticket";
        import { FixButton } from "@src/shared/ui/fix-button";
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

    describe("Allow not segments import from slices:", () => {
        it("should lint without errors", async () => {
            const report = await eslint.lintText(`
            import { AuthForm } from "entities/auth";
            import { model } from "../model";
            import { styles } from "./styles.module.scss";
            `, { filePath: "src/features/form/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 0);
        });

        it("should lint with errors", async () => {
            const report = await eslint.lintText(`
            import { AuthForm } from "entities/auth/ui";
            import { Button } from "shared/button";
            `, { filePath: "src/features/form/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 2);
        });
    });

    describe("Allow slices with structure grouping:", () => {
        it("should lint with errors", async () => {
            const report = await eslint.lintText(`
            import { AuthForm } from "entities/auth/form";
            `, { filePath: "src/features/form/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 0);
        });

        it("should lint without errors", async () => {
            const report = await eslint.lintText(`
            import { AuthForm } from "entities/auth/ui";
            import { Form } from "shared/button/form";
            `, { filePath: "src/features/form/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 2);
        });
    });

    describe("Allow not segments import in shared segments:", () => {
        it("should lint without errors", async () => {
            const report = await eslint.lintText(`
            import { Form } from "shared/ui/form";
            import { AuthAPI } from "shared/api/auth";
            import { useGeo } from "shared/lib/hooks";
            import { styles } from "shared/ui/styles";
            import { CONNECT_ATTEMPTS } from "shared/config";
            `, { filePath: "src/features/form/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 0);
        });

        it("should lint with errors", async () => {
            const report = await eslint.lintText(`
            import { Hex } from "shared/api/ui";
            import { Form } from "shared/ui/lib";
            import { AuthForm } from "shared/api/ui";
            import { model } from "shared/ui/model";
            `, { filePath: "src/features/form/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 4);
        });

        it("should lint without errors", async () => {
            const report = await eslint.lintText(`
            import { FancyLabel } from "../../label";
            import { model } from "../model";
            `, { filePath: "src/shared/ui/button/index.js" });

            assert.strictEqual(report[0].errorCount, 0);
        });

        it("should lint aliases without errors", async () => {
            const report = await eslint.lintText(`
            import { routeNames } from '@/entities/one';
            import { fetchRules } from '@entities/two';
            import { Three } from '@features/three';
            import { Four } from '@/features/four';
            `, { filePath: "src/pages/main/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 0);
        });
    });

    describe("Import from segments in shared:", () => {
        it("should lint without errors", async () => {
            const report = await eslint.lintText(`
            import { AuthAPI } from "shared/api";
            import { FancyLabel } from 'shared/ui';
            import { convertToken } from 'shared/lib';
            import { CONNECT_ATTEMPTS } from "shared/config";
            `, { filePath: "src/pages/main/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 0);
        });

        it("should lint with errors", async () => {
            const report = await eslint.lintText(`
            import { AuthAPI } from "shared/auth";
            import { FancyLabel } from 'shared/label';
            import { convertToken } from 'shared/token';
            import { CONNECT_ATTEMPTS } from "shared/const";
            `, { filePath: "src/pages/main/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 4);
        });

        it("should lint shared aliases without errors", async () => {
            const report = await eslint.lintText(`
            import { routeNames } from '@/shared/api/router';
            import { fetchRules } from '@shared/api/rules';
            `, { filePath: "src/pages/main/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 0);
        });
    });

    describe("Segment PublicAPI:", () => {
        it("Should lint Segment PublicAPI boundaries without errors.", async () => {
            const report = await eslint.lintText(`
            export { SubmitButton, SmthForm } from "./ui";
            export * from "./model";
            export { selectSmthById, selectSmthByName } from "./model";
            `, { filePath: "src/features/smth/index.ts" });

            assert.strictEqual(report[0].errorCount, 0);
        });

        describe("Exclusive Segments Public API for shared layer:", () => {
            it("Should lint with errors.", async () => {
                const report = await eslint.lintText(`
                import { Button } from "shared/ui/button/button";
                import { Date } from "shared/lib/date/date";
                `,
                    { filePath: "src/features/smth/index.ts" });
                assert.strictEqual(report[0].errorCount, 2);
            });

            it("Should lint without errors.", async () => {
                const report = await eslint.lintText(`
                import { Button } from "shared/ui/button";
                import { SexyButton } from "shared/ui";
                import { Parser } from "shared/lib";
                import { Date } from "shared/lib/date";  
                `, { filePath: "src/features/smth/index.ts" });

                assert.strictEqual(report[0].errorCount, 0);
            });
        });

    });

});

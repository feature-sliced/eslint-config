const { ESLint } = require("eslint");
const assert = require("assert");
const { configLib } = require("../../utils");
const cfg = require(".");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: configLib.setParser(
        configLib.mockImports(cfg),
    ),
});

describe("Allow publicAPI for shared segments with _prefix:", () => {
    it("with _prefix should lint without errors", async () => {
        const report = await eslint.lintText(`
        import { One } from "shared/_route/one";
        import { Two } from "@shared/_note/two";
        import { Route } from "shared/_route";
        `,
            {filePath: "src/app/ui/index.js"});
        assert.strictEqual(report[0].errorCount, 0);
    });

    it("import inner module with _prefix should lint with errors", async () => {
        const report = await eslint.lintText(`
        import { Five } from "@shared/_note/two/five";
        import { Four } from "shared/_note/three/four";
        import { Route } from "shared/route";
        `,
            {filePath: "src/app/ui/index.js"});
        assert.strictEqual(report[0].errorCount, 3);
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
            import { lockSound } from "shared/assets";
            import { CONNECT_ATTEMPTS } from "shared/config";
            `, { filePath: "src/features/form/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 0);
        });

        it("should lint with errors", async () => {
            const report = await eslint.lintText(`
            import { Hex } from "shared/api/ui";
            import { Form } from "shared/ui/lib";
            import { AuthForm } from "shared/api/ui";
            import { lockSound } from "shared/assets/ui";
            import { model } from "shared/ui/model";
            `, { filePath: "src/features/form/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 5);
        });

        it("should lint without errors", async () => {
            const report = await eslint.lintText(`
            import { FancyLabel } from "../../label";
            import { model } from "../model";
            import { lockSound } from "../assets";
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
            import { lockSound } from "shared/assets";
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
            import { lockSound } from "shared/assets/sounds";
            `, { filePath: "src/pages/main/ui/index.js" });

            assert.strictEqual(report[0].errorCount, 0);
        });
    });
});

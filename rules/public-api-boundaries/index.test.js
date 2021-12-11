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

    // 🚀 `**/*(${FS_LAYERS_NOT_SHARED_REG})/!(${FS_SEGMENTS_REG})`
    it("Should lint not segments import from slices without errors", async () => {
        const report = await eslint.lintText(`
        import { AuthForm } from "entities/auth";
        import { model } from "../model";
        import { styles } from "./styles.module.scss";
        `, { filePath: "src/features/form/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 0);
    });

    it("Should lint not segments import from slices with errors", async () => {
        const report = await eslint.lintText(`
        import { AuthForm } from "entities/auth/ui";
        import { Button } from "shared/button";
        `, { filePath: "src/features/form/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 2);
    });

    // 🚀 `**/*(${FS_LAYERS_NOT_SHARED_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`
    it("Should lint slices with structure grouping without errors", async () => {
        const report = await eslint.lintText(`
        import { AuthForm } from "entities/auth/form";
        `, { filePath: "src/features/form/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 0);
    });

    it("Should lint not segments import from slices with errors", async () => {
        const report = await eslint.lintText(`
        import { AuthForm } from "entities/auth/ui";
        import { Form } from "shared/button/form";
        `, { filePath: "src/features/form/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 2);
    });

    // 🚀 `**/shared/*(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`
    it("Should lint not segments import in shared segments without errors", async () => {
        const report = await eslint.lintText(`
        import { Form } from "shared/ui/form";
        import { AuthAPI } from "shared/api/auth";
        import { useGeo } from "shared/lib/hooks";
        import { styles } from "shared/ui/styles";
        import { CONNECT_ATTEMPTS } from "shared/config";
        `, { filePath: "src/features/form/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 0);
    });

    it("Should lint not segments import in shared segments with errors", async () => {
        const report = await eslint.lintText(`
        import { Hex } from "shared/api/ui";
        import { Form } from "shared/ui/lib";
        import { AuthForm } from "shared/api/ui";
        import { model } from "shared/ui/model";
        `, { filePath: "src/features/form/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 4);
    });

    it("Should lint import in shared segments from shared dir without errors", async () => {
        const report = await eslint.lintText(`
        import { FancyLabel } from "../../label";
        import { model } from "../model";
        `, { filePath: "src/shared/ui/button/index.js" });

        assert.strictEqual(report[0].errorCount, 0);
    });

    // 🚀 `**/shared/*(${FS_SEGMENTS_REG})`
    it("Should lint import from segments in shared without errors", async () => {
        const report = await eslint.lintText(`
        import { AuthAPI } from "shared/api";
        import { FancyLabel } from 'shared/ui';
        import { convertToken } from 'shared/lib';
        import { CONNECT_ATTEMPTS } from "shared/config";
        `, { filePath: "src/pages/main/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 0);
    });

    it("Should lint import from segments in shared with errors", async () => {
        const report = await eslint.lintText(`
        import { AuthAPI } from "shared/auth";
        import { FancyLabel } from 'shared/label';
        import { convertToken } from 'shared/token';
        import { CONNECT_ATTEMPTS } from "shared/const";
        `, { filePath: "src/pages/main/ui/index.js" });

        assert.strictEqual(report[0].errorCount, 4);
    });
});

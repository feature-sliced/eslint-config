const { ESLint } = require("eslint");
const assert = require("assert");
const { configLib } = require("../../utils");
const cfg = require("./");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: configLib.setParser(cfg),
});

describe("Import order:", () => {

    it("should lint with errors.", async () => {
        const report = await eslint.lintText(`
        import { Cart } from "@/entities/cart";    // 5 
        import { Input } from "~/shared/ui";       // 3.1
        import { getSmth } from "./lib";           // 1
        import axios from "axios";                 // 10
        import { data } from "../fixtures";        // 2
        import { authModel } from "entities/auth"; // 5
        import { Button } from "shared/ui";        // 4
        import { LoginForm } from "features/login-form"; // 8
        import { Header } from "widgets/header";   // 9
        import { debounce } from "shared/lib/fp";  // 3
        import { One } from "@entities/one";       // 6
        import { Two } from "~entities/two";       // 7
        `);

        assert.strictEqual(report[0].errorCount, 8);
    });

    it("should lint without errors.", async () => {
        const report = await eslint.lintText(`
        // warn: specific order in mixed alias ~/layer => ~layer => layer 
        import axios from "axios";                           // 1) external libs
        import { Header } from "widgets/header";             // 2.1) Layers: widgets
        import { Zero } from "widgets/zero";                 // 2.1) Layers: widget 
        import { LoginForm } from "features/login-form";     // 2.2) Layers: features
        import { authModel } from "entities/auth";           // 2.4) Layers: entities
        import { Cart } from "entities/cart";                // 2.4) Layers: entities 
        import { One } from "entities/one";                  // 2.4) Layers: entities 
        import { Two } from "entities/two";                  // 2.4) Layers: entities
        import { debounce } from "shared/lib/fp";            // 2.5) Layers: shared
        import { Button } from "shared/ui";                  // 2.5) Layers: shared
        import { Input } from "shared/ui";                   // 2.5) Layers: shared
        import { data } from "../fixtures";                  // 3) parent
        import { getSmth } from "./lib";                     // 4) sibling
        `);
        assert.strictEqual(report[0].errorCount, 0);
    });


    it("should lint without errors.", async () => {
        const report = await eslint.lintText(`
        // warn: specific order in mixed alias ~/layer => ~layer => layer
        // not used in real, but test aliases support 
        import axios from "axios";                           // 1) external libs
        import { Zero } from "@widgets/zero";                // 2.1) Layers: widget - Alias
        import { Header } from "widgets/header";             // 2.1) Layers: widgets
        import { LoginForm } from "features/login-form";     // 2.2) Layers: features
        import { Cart } from "@/entities/cart";              // 2.3) Layers: entities - Alias
        import { One } from "@entities/one";                 // 2.3) Layers: entities - Alias
        import { Two } from "@entities/two";                 // 2.3) Layers: entities - Alias
        import { authModel } from "entities/auth";           // 2.3) Layers: entities
        import { debounce } from "shared/lib/fp";            // 2.4) Layers: shared
        import { Button } from "shared/ui";                  // 2.4) Layers: shared
        import { Input } from "~/shared/ui";                 // 2.4) Layers: shared - Alias
        import { data } from "../fixtures";                  // 3) parent
        import { getSmth } from "./lib";                     // 4) sibling
        `);
        assert.strictEqual(report[0].errorCount, 0);
    });

    it("aliased layers should lint with errors.", async () => {
        const report = await eslint.lintText(`
        import { Third } from '@shared/third';
        import { Second } from '@entities/second';
        import { First } from '@features/first';
        `);

        assert.strictEqual(report[0].errorCount, 2);
    });

    it("aliased layers should lint without errors.", async () => {
        const report = await eslint.lintText(`
        import { First } from '@features/first';
        import { Second } from '@entities/second';
        import { Third } from '@shared/third';
        `);

        assert.strictEqual(report[0].errorCount, 0);
    });

    describe("Alphabetic sort feature:", () => {

        it("should be alphabetic", async () => {
            const report = await eslint.lintText(`
            import { Apple } from 'features/apple';
            import { Bee } from 'features/bee';
            import { Cord } from 'features/cord';
            import { Dream } from 'features/dream';
            `);

            assert.strictEqual(report[0].errorCount, 0);
        });

        it("should be alphabetic error", async () => {
            const report = await eslint.lintText(`
            import { Dream } from 'features/dream';
            import { Cord } from 'features/cord';
            import { Bee } from 'features/bee';
            import { Apple } from 'features/apple';
            `);

            assert.strictEqual(report[0].errorCount, 3);
        });

    })

});

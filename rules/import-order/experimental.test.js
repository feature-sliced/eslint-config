const { ESLint } = require("eslint");
const assert = require("assert");
const { configLib } = require("../../utils");
const cfg = require("./experimental");

const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: configLib.setParser(cfg),
});

describe("Import order experimental:", () => {

    it("should lint with errors.", async () => {
        const report = await eslint.lintText(`
        import { Cart } from "@/entities/cart"; // 6 - Alias
        import { Input } from "~/shared/ui"; // 7 - Alias
        import { getSmth } from "./lib"; // 1
        import axios from "axios";
        import { data } from "../fixtures"; // 2
        import { authModel } from "entities/auth"; 
        import { Button } from "shared/ui"; // 3
        import { LoginForm } from "features/login-form"; // 4
        import { Header } from "widgets/header"; // 5
        import { debounce } from "shared/lib/fp";
        import { One } from "@entities/one";
        import { Two } from "~entities/two"; 
        `);

        assert.strictEqual(report[0].errorCount, 18);
    });

    it("should lint without errors.", async () => {
        const report = await eslint.lintText(`
        import axios from "axios";
        
        import { debounce } from "shared/lib/fp";            
        import { model } from "shared/model";
        import { Button } from "shared/ui";
        
        import { authModel } from "entities/auth";
        import { Cart } from "entities/cart";
        import { One } from "entities/one";
        import { Two } from "entities/two";
        
        import { LoginForm } from "features/login-form";
        
        import { Header } from "widgets/header";
        import { Zero } from "widgets/zero";
        
        import { data } from "../fixtures";
        
        import { getSmth } from "./lib";
        `);

        assert.strictEqual(report[0].errorCount, 0);
    });


    it("~aliased should lint without errors.", async () => {
        const report = await eslint.lintText(`
        import axios from "axios";
        
        import { debounce } from "~shared/lib/fp";            
        import { model } from "~shared/model";
        import { Button } from "~shared/ui";
        
        import { authModel } from "~entities/auth";
        import { Cart } from "~entities/cart";
        import { One } from "~entities/one";
        import { Two } from "~entities/two";
        
        import { LoginForm } from "~features/login-form";
        
        import { Header } from "~widgets/header";
        import { Zero } from "~widgets/zero";
        
        import { data } from "../fixtures";
        
        import { getSmth } from "./lib";
        `);

        assert.strictEqual(report[0].errorCount, 0);
    });


    it("~/aliased should lint without errors.", async () => {
        const report = await eslint.lintText(`
        import axios from "axios";
        
        import { debounce } from "~/shared/lib/fp";            
        import { model } from "~/shared/model";
        import { Button } from "~/shared/ui";
        
        import { authModel } from "~/entities/auth";
        import { Cart } from "~/entities/cart";
        import { One } from "~/entities/one";
        import { Two } from "~/entities/two";
        
        import { LoginForm } from "~/features/login-form";
        
        import { Header } from "~/widgets/header";
        import { Zero } from "~/widgets/zero";
        
        import { data } from "../fixtures";
        
        import { getSmth } from "./lib";
        `);

        assert.strictEqual(report[0].errorCount, 0);
    });


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

    it("should be with spaces between layers", async () => {
        const report = await eslint.lintText(`
        import { Dream } from 'shared/dream';
        
        import { Cord } from 'entities/cord';
        
        import { Bee } from 'features/bee';
        
        import { Apple } from 'app/apple'; 
        `);

        assert.strictEqual(report[0].errorCount, 0);
    });

    it("should be with spaces between layers errors", async () => {
        const report = await eslint.lintText(`import React from 'react';
        import { Dream } from 'shared/dream';
        import { Cord } from 'entities/cord';
        import { Bee } from 'features/bee';
        import { Apple } from 'app/apple';
        `);

        assert.strictEqual(report[0].errorCount, 4);
    });
});

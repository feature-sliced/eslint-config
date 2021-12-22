# [@feature-sliced/eslint-config](https://www.npmjs.com/package/@feature-sliced/eslint-config)

> `WIP:` For a while - not production ready

[npm]: https://www.npmjs.com/package/@feature-sliced/eslint-config

[![npm](https://img.shields.io/npm/v/@feature-sliced/eslint-config?style=flat-square)][npm]
[![npm](https://img.shields.io/npm/dw/@feature-sliced/eslint-config?style=flat-square)][npm]
[![npm bundle size](https://img.shields.io/bundlephobia/min/@feature-sliced/eslint-config?style=flat-square)][npm]
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/feature-sliced/eslint-config/Test%20current%20build?label=tests&style=flat-square)](https://github.com/feature-sliced/eslint-config/actions)

<img src="https://avatars.githubusercontent.com/u/60469024?s=120&v=4" align="right">

Linting of [FeatureSliced](https://github.com/feature-sliced/documentation) concepts *by existing eslint-plugins*

- Control [**Isolation**](https://feature-sliced.design/docs/concepts/low-coupling)
- Control [**Decomposition**](https://feature-sliced.design/docs/concepts/app-splitting)
- Control [**Public API**](https://feature-sliced.design/docs/concepts/public-api)
- Control [**Layers & Scopes**](https://feature-sliced.design/docs/reference/layers)
- Control [**Naming**](https://feature-sliced.design/docs/concepts/naming-adaptability)

<!--
Uncomment if will be needed

## Table of contents
* [Overview](#overview)
* [Get started](#get-started)
* [Usage](#usage)
* [Also](#also)
-->

<!--
## Overview

> See [included rules](/index.js)
-->

<!--
This config help you

<details>
<summary>to <b>restrict imports</b> (not private paths, only public API)</summary>

```ts
// Fail
import { IssuesPage } from "pages/issues/ui";
import { addToCart } from "features/add-to-cart/model/actions"
import { Button } from "shared/ui/button/button";

// Pass
import { Issues } from "pages/issues";
import { addToCartModel } from "features/add-to-cart"
import { Button } from "shared/ui/button";
```

</details>
<details>
<summary>to <b>order imports</b> (app > pages > features > entities > shared)</summary>

```ts
// Fail
import { getSmth } from "./lib";
import axios from "axios";
import { data } from "../fixtures";
import { Button } from "shared/ui";
import { LoginForm } from "features/login-form";
import { debounce } from "shared/lib";

// Pass
import axios from "axios"; // 1) external libs
import { LoginForm } from "features/login-form"; // 2) features
import { Button } from "shared/ui"; // 3) shared/**
import { debounce } from "shared/lib";
import { data } from "../fixtures"; // 4) parent
import { getSmth } from "./lib"; // 5) sibling
```

</details>
<details>
<summary>to <b>use only absolute imports</b> (relative - only for module internal using)</summary>

> **NOTE:** Be sure, that your tsconfig allows you to use absolute imports
>
> - `baseUrl: "./src"`
>
```ts
// Fail
import Routing from "../../pages"
import { LoginForm } from "../features/login-form";
import { Button } from "../shared/ui";

// Pass
import Routing from "pages"
import { LoginForm } from "features/login-form";
import { Button } from "shared/ui";
```

</details>

-->

## Rules
- [`import-order`](./rules/import-order/index.md)
- [`public-api-boundaries`](./rules/public-api-boundaries/index.md)
- [`layers-slices-boundaries`](./rules/layers-slices-boundaries/index.md)

## Get Started

1. You'll first need to install [ESLint](http://eslint.org):

    ```sh
    $ npm install --save-dev eslint
    # or by yarn
    $ yarn add -D eslint
    ```

2. Next, install `@feature-sliced/eslint-config` and dependencies:

    ```sh
    $ npm install --save-dev @feature-sliced/eslint-config eslint-plugin-import eslint-plugin-boundaries
    # or by yarn
    $ yarn add -D @feature-sliced/eslint-config eslint-plugin-import eslint-plugin-boundaries
    ```

3. Add config to the `extends` section of your `.eslintrc` configuration file (for **recommended** rules). You can omit the `eslint-config` postfix:

    ```json
    {
        "extends": ["@feature-sliced"]
    }
    ```

## Customization
You can partially use the rules

```json
{
  "extends": [
    "@feature-sliced/eslint-config/rules/import-order",
    "@feature-sliced/eslint-config/rules/public-api-boundaries",
    "@feature-sliced/eslint-config/rules/layers-slices-boundaries"
  ]
}
```

> **WARN:** Don't use main config (`@feature-sliced`) in customization to avoid rules conflicts.

## TypeScript

This plugin can be used also in TypeScript projects using `@typescript-eslint/eslint-plugin`. Follow next steps to configure it:

1. Install dependencies:

   ```sh
   $ npm i --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-import-resolver-typescript
   # or by yarn
   $ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-import-resolver-typescript
   ```


2. Configure `@typescript-eslint/parser` as parser and setup the `eslint-import-resolver-typescript` resolver in the `.eslintrc` config file:

   ```json
   {
     "parser": "@typescript-eslint/parser",
     "settings": {
       "import/resolver": {
         "typescript": {
           "alwaysTryTypes": true
         }
       }
     }
   }
   ```


## See also

- [FAQ](./FAQ.md)
- [Releases & Changelog](https://github.com/feature-sliced/eslint-config/releases)
- [**How can I help?**](./CONTRIBUTING.md)
  - ⭐ Rate us on GitHub
  - 💫 Any assistance is important - from feedback to participation in the development of the methodology!

# [@feature-sliced/eslint-config](https://www.npmjs.com/package/@feature-sliced/eslint-config)

> `WIP:` For a while - not production ready

[npm]: https://www.npmjs.com/package/@feature-sliced/eslint-config

[![npm](https://img.shields.io/npm/v/@feature-sliced/eslint-config?style=flat-square)][npm]
[![npm](https://img.shields.io/npm/dw/@feature-sliced/eslint-config?style=flat-square)][npm]
[![npm bundle size](https://img.shields.io/bundlephobia/min/@feature-sliced/eslint-config?style=flat-square)][npm]
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Ffeature-sliced%2Feslint-plugin&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=true)](https://hits.seeyoufarm.com)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/feature-sliced/eslint-config/Test%20current%20build?label=tests&style=flat-square)](https://github.com/feature-sliced/eslint-config/actions)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/feature-sliced/eslint-config?style=flat-square)](https://github.com/feature-sliced/eslint-config/commits)

<img src="https://avatars.githubusercontent.com/u/60469024?s=120&v=4" align="right">

Linting of [FeatureSliced](https://github.com/feature-sliced/documentation) concepts *by existing eslint-plugins*

- Control [**Isolation**](#)
- Control [**Decomposition**](#)
- Control [**Public API**](#)
- Control [**Layered dependencies**](#)
- Control [**Naming**](#)

<!--
Uncomment if will be needed

## Table of contents
* [Overview](#overview)
* [Get started](#get-started)
* [Usage](#usage)
* [Also](#also)
-->

## Overview

> See [included rules](/index.js)

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

## Get started

1. You'll first need to install [ESLint](http://eslint.org) (with default plugins):

    ```sh
    npm install --save-dev eslint
    ```

2. Next, install `@feature-sliced/eslint-config` and dependencies:

    ```sh
    npm install --save-dev @feature-sliced/eslint-config eslint-plugin-import eslint-plugin-boundaries
    ```

3. Add config ( for **recommended** presets ) to the `extends` section of your eslint configuration file. You can omit the `eslint-plugin` suffix:

    ```json
    {
        "extends": ["@feature-sliced"]
    }
    ```

## Customization
You can partially use the rules

#### Note:
Don't use main config (`@feature-sliced`) in customization to avoid rules conflicts.

#### Example:
```json
    {
        "extends": [
          "@feature-sliced/eslint-config/rules/import-order",
          "@feature-sliced/eslint-config/rules/public-api-boundaries",
          "@feature-sliced/eslint-config/rules/layers-slices-boundaries"
        ]
    }
```

#### Available rules
- [import-order](./rules/import-order/index.md)
- [public-api-boundaries](./rules/public-api-boundaries/index.md)
- [layers-slices-boundaries](./rules/layers-slices-boundaries/index.md)

## Usage with TypeScript

This plugin can be used also in TypeScript projects using @typescript-eslint/eslint-plugin. Follow next steps to configure it:

Install dependencies:

```shell
npm i --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-import-resolver-typescript
```
or:
```shell
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-import-resolver-typescript
```

Configure `@typescript-eslint/parser` as parser and setup the `eslint-import-resolver-typescript` resolver in the `.eslintrc.json` config file:
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


## Also

- [FAQ](./FAQ.md)
- [Releases & Changelog](https://github.com/feature-sliced/eslint-config/releases)
- [**How can I help?**](./CONTRIBUTING.md)
  - ⭐ Rate us on GitHub
  - 💫 Any assistance is important - from feedback to participation in the development of the methodology!

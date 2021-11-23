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

Linting of [FeatureSliced](https://github.com/feature-sliced/wiki) concepts *by existing eslint-plugins*

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

2. Next, install `@feature-sliced/eslint-config`:

    ```sh
    npm install --save-dev @feature-sliced/eslint-config
    ```

3. Add config to the `extends` section of your eslint configuration file. You can omit the `eslint-plugin` suffix:

    ```json
    {
        "extends": ["@feature-sliced"]
    }
    ```

> Further, you can override / disable some rules if needed.

## Also

- [FAQ](./FAQ.md)
- [Releases & Changelog](https://github.com/feature-sliced/eslint-config/releases)
- [**How can I help?**](./CONTRIBUTING.md)
  - ⭐ Rate us on GitHub
  - 💫 Any assistance is important - from feedback to participation in the development of the methodology!

# [@feature-driven/eslint-config](https://www.npmjs.com/package/@feature-driven/eslint-config)

[npm]: https://www.npmjs.com/package/@feature-driven/eslint-config

[![npm](https://img.shields.io/npm/v/@feature-driven/eslint-config?style=flat-square)][npm]
[![npm](https://img.shields.io/npm/dw/@feature-driven/eslint-config?style=flat-square)][npm]
[![npm bundle size](https://img.shields.io/bundlephobia/min/@feature-driven/eslint-config?style=flat-square)][npm]
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Ffeature-driven%2Feslint-plugin&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=true)](https://hits.seeyoufarm.com)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/feature-driven/eslint-config/Test%20current%20build?label=tests&style=flat-square)](https://github.com/feature-driven/eslint-config/actions)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/feature-driven/eslint-config?style=flat-square)](https://github.com/feature-driven/eslint-config/commits)

<!-- TODO: set later size as 120px (without overlapping!) -->
<img src="https://avatars3.githubusercontent.com/u/74538205?s=92&v=4" align="right">

Linting of [Feature Driven Architecture](https://github.com/feature-driven/wiki) principles *by standard eslint-plugins*

- Control [**Co-location**](https://github.com/feature-driven/wiki#concepts)
- Control [**Decoupling && isolating**](https://github.com/feature-driven/wiki#concepts)

> But unfortunately, *while* it can't allow you
> - to control [*Decentralization*](https://github.com/feature-driven/wiki#concepts)
> - to control [*Explicit sharing*](https://github.com/feature-driven/wiki#concepts)
> - to control [*Disposability*](https://github.com/feature-driven/wiki#concepts)
>
> Also, strictness level limited by plugins API
>
> **More power** - in our [@feature-driven/eslint-plugin](https://github.com/feature-driven/eslint-plugin)

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

This config help you

<details>
<summary>to <b>restrict imports</b> (not private paths, only public API)</summary>

```ts
// Fail
import { Issues } from "pages/issues";
import { IssueDetails } from "features/issue-details"
import { Button } from "shared/components/button";

// Pass
import Routing from "pages"; // specific pages shouldn't be reexported
import { IssueDetails } from "features" // all features should be reexported, for usage
import { Button } from "shared/components"; // all components should be reexported, for usage
```

</details>
<details>
<summary>to <b>order imports</b> (app > pages > features > shared > models)</summary>

```ts
// Fail
import { Helper } from "./helpers";
import axios from "axios";
import { data } from "../fixtures";
import { Button } from "shared/components"
import { IssueDetails, RepoList } from "features"
import { debounce } from "shared/helpers"

// Pass
import axios from "axios"; // 1) external libs
import { IssueDetails, RepoList } from "features" // 2) features
import { Button } from "shared/components" // 3) shared/**
import { debounce } from "shared/helpers"
import { data } from "../fixtures"; // 4) parent
import { Helper } from "./helpers"; // 5) sibling
```

</details>
<details>
<summary>to <b>use only absolute imports</b> (relative - only for module internal using)</summary>

> **NOTE:** Be sure, that your tsconfig allows you to use absolute imports
> - `baseUrl: "./src"`
```ts
// Fail
import Routing from "../../pages"
import { IssueDetails } from "../features";
import { Button } from "../shared/components";

// Pass
import Routing from "pages"
import { IssueDetails } from "features";
import { Button } from "shared/components";
```

</details>

## Get started

1. You'll first need to install [ESLint](http://eslint.org) (with default plugins):
    ```sh
    $ npm install --save-dev eslint
    ```

2. Next, install `@feature-driven/eslint-config`:
    ```sh
    $ npm install --save-dev @feature-driven/eslint-config
    ```

3. Add config to the `extends` section of your eslint configuration file. You can omit the `eslint-plugin` suffix:
    ```json
    {
        "extends": ["@feature-driven"]
    }
    ```

> Further, you can override / disable some rules if needed.

## Also
- [FAQ](./FAQ.md)
- **How can you help?**
  - ⭐ Rate us on GitHub, if it's worth on your opinion 
    > And if this solution must keep to developing
  - 💫 Have a look at our [contributing](./CONTRIBUTING.md) guide!
    > **Everything is matter** - from *feedback* to *participating* in development!
    >
    > *Commit like nobody sees, Push like nobody hears*



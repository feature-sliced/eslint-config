# [@feature-sliced/eslint-config](https://www.npmjs.com/package/@feature-sliced/eslint-config)

> `WIP:` At the moment at beta-testing - [use carefully](https://github.com/feature-sliced/eslint-config/discussions/75)

[npm]: https://www.npmjs.com/package/@feature-sliced/eslint-config

[![npm](https://img.shields.io/npm/v/@feature-sliced/eslint-config?style=flat-square)][npm]
[![npm](https://img.shields.io/npm/dw/@feature-sliced/eslint-config?style=flat-square)][npm]
[![npm bundle size](https://img.shields.io/bundlephobia/min/@feature-sliced/eslint-config?style=flat-square)][npm]
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/feature-sliced/eslint-config/Test%20current%20build?label=tests&style=flat-square)](https://github.com/feature-sliced/eslint-config/actions)

<img src="https://avatars.githubusercontent.com/u/60469024?s=120&v=4" align="right">

Linting of [FeatureSliced](https://github.com/feature-sliced/documentation) concepts *by existing eslint-plugins*

- Control [**Isolation**](https://feature-sliced.design/docs/concepts/low-coupling) & [**Decomposition**](https://feature-sliced.design/docs/concepts/app-splitting)
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

## Rules

Each rule has its own test cases and customization aspects

- [`import-order`](./rules/import-order)
- [`public-api`](./rules/public-api)
- [`layers-slices`](./rules/layers-slices)

## Get Started

1. You'll first need to install [ESLint](http://eslint.org):

    ```sh
    $ npm install -D eslint
    # or by yarn
    $ yarn add -D eslint
    ```

2. Next, install `@feature-sliced/eslint-config` and dependencies:

    ```sh
    $ npm install -D @feature-sliced/eslint-config eslint-plugin-import eslint-plugin-boundaries
    # or by yarn
    $ yarn add -D @feature-sliced/eslint-config eslint-plugin-import eslint-plugin-boundaries
    ```

3. Add config to the `extends` section of your `.eslintrc` configuration file (for **recommended** rules). You can omit the `eslint-config` postfix:

    ```json
    {
        "extends": ["@feature-sliced"]
    }
    ```

4. `TYPESCRIPT-ONLY:` Also setup TS-parser and TS-plugin [(why?)](https://github.com/javierbrea/eslint-plugin-boundaries#usage-with-typescript)
    <details>
    <summary>Details</summary>

    **Install dependencies:**

    ```sh
    $ npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-import-resolver-typescript
    # or by yarn
    $ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-import-resolver-typescript
    ```

    **Configure `@typescript-eslint/parser` as parser and setup the `eslint-import-resolver-typescript` resolver in the `.eslintrc` config file:**

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

    </details>

## Usage

- Support general **aliases**

  ```js
  import { Input } from "~/shared/ui/input";
  import { Input } from "@/shared/ui/input";
  import { Input } from "@shared/ui/input";
  import { Input } from "$shared/ui/input";
  // But not - import { Input } from "$UIKit/input";
  ```

- Support **relative** and **absolute** imports (but look at [recommendations](https://github.com/feature-sliced/eslint-config/issues/29))

  ```js
  import { ... } from "entities/foo";    // absolute imports
  import { ... } from "@/entities/foo";  // aliased imports
  import { ... } from "../entities/foo"; // relative imports
  ```

- **Case**-agnostic

  ```js
  import { ... } from "entities/user-post";  // Support kebab-case (recommended)
  import { ... } from "entities/UserPost";   // Support PascalCase
  import { ... } from "entities/userPost";   // Support camelCase
  import { ... } from "entities/user_post";  // Support snake_case
  ```

- For exceptional cases, support ⚠️**DANGEROUS-mode**⚠️ (see more for [specific rule](#rules))

## Customization

1. You can *partially use* the rules

   > **WARN:** Don't use main config (`"@feature-sliced"`) in customization to avoid rules conflicts.

   ```js
   "extends": [
     "@feature-sliced/eslint-config/rules/import-order",
     "@feature-sliced/eslint-config/rules/public-api",
     "@feature-sliced/eslint-config/rules/layers-slices",
   ]
   ```

1. You can use *alternative experimental rules*
    - Use [`import-order/experimental`](./rules/import-order#Experimental) for formatting with spaces between groups and reversed order of layers [(why?)](https://github.com/feature-sliced/eslint-config/issues/85)

      ```js
      "extends": [
        // ... Other rules or config
        "@feature-sliced/eslint-config/rules/import-order/experimental",
      ]
      ```

    - Use [`public-api/lite`](./rules/public-api#Lite) for less strict PublicAPI boundaries [(why?)](https://github.com/feature-sliced/eslint-config/issues/90)

        ```js
        "extends": [
          // ... Other rules or config
          "@feature-sliced/eslint-config/rules/public-api/lite",
        ]
        ```

1. You can use *warnings* instead of *errors* for specific rules

   ```js
   "rules": {
      // feature-sliced/import-order
      "import/order": "warn" // ~ 1,
      // feature-sliced/public-api
      "import/no-internal-modules": "warn" // ~ 1,
      // feature-sliced/layers-slices
      "boundaries/element-types": "warn" // ~ 1,
   }
   ```
  
1. You can use *[advanced FSD-specific messages processing](https://www.npmjs.com/package/@feature-sliced/eslint-plugin-messages)*

   ```diff
   # (feature-sliced/public-api)
   - 'Reaching to "features/search/ui" is not allowed.'
   + 'Violated usage of modules Public API | https://git.io/Jymjf'
    ```

## See also

- [FAQ](./FAQ.md)
- [Releases & Changelog](https://github.com/feature-sliced/eslint-config/releases)
- [**How can I help?**](./CONTRIBUTING.md)
  - ⭐ Rate us on GitHub
  - 💫 **Any assistance is important** - from *feedback to participation in the development of the methodology*!

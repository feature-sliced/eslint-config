# [@feature-sliced/eslint-config](https://www.npmjs.com/package/@feature-sliced/eslint-config)

> `WIP:` At the moment at alpha testing - [use carefully](https://github.com/feature-sliced/eslint-config/discussions/55)

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

## Rules

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

## Customization

1. You can partially use the rules

   > **WARN:** Don't use main config (`"@feature-sliced"`) in customization to avoid rules conflicts.

   ```json
   {
     "extends": [
       "@feature-sliced/eslint-config/rules/import-order",
       "@feature-sliced/eslint-config/rules/public-api",
       "@feature-sliced/eslint-config/rules/layers-slices"
     ]
   }
   ```

2. You can use [advanced FeatureSliced-specific messages processing](https://www.npmjs.com/package/@feature-sliced/eslint-plugin-messages)

   ```diff
   # (feature-sliced/public-api)
   - 'Reaching to "features/search/ui" is not allowed.'
   + 'Violated usage of modules Public API | https://git.io/Jymjf'
    ```

3. You can use *warnings* instead of *errors* for specific rules

   ```json
   // feature-sliced/import-order
   "import/order": "warn" // ~ 1,
   // feature-sliced/public-api
   "import/no-internal-modules": "warn" // ~ 1,
   // feature-sliced/layers-slices
   "boundaries/element-types": "warn" // ~ 1,
   ```

## TypeScript

This plugin can be used also in TypeScript projects using `@typescript-eslint/eslint-plugin`. Follow next steps to configure it:

1. Install dependencies:

   ```sh
   $ npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-import-resolver-typescript
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

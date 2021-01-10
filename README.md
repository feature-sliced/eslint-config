# `wip` [eslint-config](https://www.npmjs.com/package/@feature-driven/eslint-config)

> **DISCLAIMER**: Work in process, and accordingly:
> - For a while - here is **approximate** description
> - First stable version will be signed as **0.1.0**

<!-- TODO: set later size as 120px (without overlapping!) -->
<img src="https://avatars3.githubusercontent.com/u/74538205?s=92&v=4" align="right">

Linting of [Feature Driven Architecture](https://www.notion.so/Feature-Driven-Architecture-dfe306d664ae4780bcf999ccdd15e532) principles *by standard eslint-plugins*

- Control **Co-location**
- Control **Decoupling && isolating**

> But unfortunately, *while* it can't allow you
> - to control *Decentralization*
> - to control *Explicit sharing*
> - to control *Disposability*
>
> Also, strictness level limited by plugins API
>
> **More power** - in our [@feature-driven/eslint-plugin](https://github.com/feature-driven/eslint-plugin)

## Table of contents

<!--ts-->
   <!-- TODO* [Overview](#overview) -->
   * [Installation](#installation)
   * [Usage](#usage)
   * [Rules](#rules)
   * [Also](#also)
<!--te-->

<!-- TODO: ## Overview -->


## Installation

You'll first need to install [ESLint](http://eslint.org) (with default plugins):

```sh
$ npm install --save-dev eslint
```

Next, install `@feature-driven/eslint-config`:

```sh
$ npm install --save-dev @feature-driven/eslint-config
```


## Usage

Add config to the `extends` section of your eslint configuration file. You can omit the `eslint-plugin` suffix:

```json
{
    "extends": [
        "@feature-driven",
    ]
}
```

Further, you can override / disable some rules if needed.
## Rules

- See [included rules](/index.js)

## Also
- You want to participate in the development of the project? Have a look at our [contributing](./CONTRIBUTING.md) guide!
   > Commit like nobody sees, Push like nobody hears
- [FAQ](./FAQ.md)



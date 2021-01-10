# `wip` [eslint-config](https://www.npmjs.com/package/@feature-driven/eslint-config)

> **DISCLAIMER**: Work in process, and accordingly:
> - For a while - here is **approximate** description
> - First stable version will be signed as **0.1.0**

<!-- TODO: set later size as 120px (without overlapping!) -->
<img src="https://avatars3.githubusercontent.com/u/74538205?s=92&v=4" align="right">

Linting of [Feature Driven Architecture](https://www.notion.so/Feature-Driven-Architecture-dfe306d664ae4780bcf999ccdd15e532) principles *by standard eslint-plugins*

- Control [**Co-location**](https://www.notion.so/Feature-Driven-Architecture-dfe306d664ae4780bcf999ccdd15e532#679ac063d0a448eb88ea97b712ff2d76)
- Control [**Decoupling && isolating**](https://www.notion.so/Feature-Driven-Architecture-dfe306d664ae4780bcf999ccdd15e532#095ab6032c2542ebbc18fb48f57e4037)

> But unfortunately, *while* it can't allow you
> - to control [*Decentralization*](https://www.notion.so/Feature-Driven-Architecture-dfe306d664ae4780bcf999ccdd15e532#200c3a0b57ac4f238d2b96015cdbc5e8)
> - to control [*Explicit sharing*](https://www.notion.so/Feature-Driven-Architecture-dfe306d664ae4780bcf999ccdd15e532#f0cb101913d04704ad540ebe1c5164e7)
> - to control [*Disposability*](https://www.notion.so/Feature-Driven-Architecture-dfe306d664ae4780bcf999ccdd15e532#58991e6707c84a7f92e5740134ffc26c)
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
import { Button } from "./shared/components";

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
- You want to participate in the development of the project? Have a look at our [contributing](./CONTRIBUTING.md) guide!
   > Commit like nobody sees, Push like nobody hears
- [FAQ](./FAQ.md)



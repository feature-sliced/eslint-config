# @feature-sliced/layers-slices

#### Reference: [Cross-communication](https://feature-sliced.design/docs/concepts/cross-communication)

## Usage

Add `"@feature-sliced/eslint-config/rules/layers-slices"` to your `extends` section in ESLint config.

```js
// 👎 Fail
// 🛣 features/auth-form/index.ts
import { getRoute } from "pages/auth";
import { getStore } from "app/store";
import { getAuthCtx } from "features/logout";
import { UserAvatar } from "features/viewer-picker";

// 👍 Pass
// 🛣 features/auth-form/index.ts
import { sessionModel } from "entities/session";
import { Form, Button } from "shared/ui";
import { getAuthCtx } from "entities/session";
import { UserAvatar } from "entities/user";
```

---

> ⚠️ **DANGEROUS-mode**: Support service directories for slices by `_` prefix ([why?](https://github.com/feature-sliced/eslint-config/discussions/75#discussioncomment-2056223))
>
> Use carefully and at your own risk
>
> ```js
> import { ... } from "../HomePage";
> import { ... } from "../ProfilePage";
>
> // Imported into ...
> @path "app/**"                   // 🟩 valid (upper layer)
> @path "shared/router"            // 🟥 not valid (lower layer)
> @path "pages/CartPage"           // 🟥 not valid (sibling slice)
> @path "pages/router"             // 🟥 not valid (sibling slice)
> @path "pages/_router"            // 🟩 again valid (as service directory/slice)
> ```
>
> But still actual:
>
> ```js
> @path "pages/_router"
> import { ... } from "app"           // 🟥 not valid (lower layer)
> 
> @path "shared/lib"
> import { ... } from "pages/_router" // 🟥 not valid (lower layer)
> ```
>
> <sup>*Only for @^0.1.0-beta.6*</sup>

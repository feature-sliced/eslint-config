# @feature-sliced/layers

#### Reference: [Layers](https://feature-sliced.design/docs/reference/layers/overview)

#### Usage:
Add `"@feature-sliced/eslint-config/rules/layers"` to you `extends` section in ESLint config.

```js
// 👎 Fail
// 🛣 features/auth-form/index.ts
import { getRoute } from "pages/auth";
import { getStore } from "app/store";


// 👍 Pass
// 🛣 features/auth-form/index.ts
import { Form, Button } from "shared/ui";
import { getAuthCtx } from "entities/session";
```

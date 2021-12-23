# @feature-sliced/layers-slices-boundaries

Reference: [Cross-communication](https://feature-sliced.design/docs/concepts/cross-communication)

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

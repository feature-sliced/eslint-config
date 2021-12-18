# @feature-sliced/layers-slices-boundaries

Reference: [Cross-communication](https://feature-sliced.design/docs/concepts/cross-communication)

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

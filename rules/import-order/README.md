# @feature-sliced/import-order

#### Reference: [Layers](https://feature-sliced.design/docs/reference/layers)

#### Usage:
Add `"@feature-sliced/eslint-config/rules/import-order"` to you `extends` section in ESLint config.

```js
// 👎 Fail
import { getSmth } from "./lib";
import axios from "axios";
import { data } from "../fixtures";
import { authModel } from "entities/auth";
import { Button } from "shared/ui";
import { LoginForm } from "features/login-form";
import { Header } from "widgets/header";
import { debounce } from "shared/lib/fp";

// 👍 Pass
import axios from "axios";                           // 1) external libs
import { Header } from "widgets/header";             // 2.1) Layers: widgets
import { LoginForm } from "features/login-form";     // 2.2) Layers: features
import { authModel } from "entities/auth";           // 2.3) Layers: entities
import { Button } from "shared/ui";                  // 2.4) Layers: shared
import { debounce } from "shared/lib/fp";            // 2.4) Layers: shared
import { data } from "../fixtures";                  // 3) parent
import { getSmth } from "./lib";                     // 4) sibling
```

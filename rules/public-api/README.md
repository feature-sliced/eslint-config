# @feature-sliced/public-api

#### Reference: [PublicAPI](https://feature-sliced.design/docs/concepts/public-api)

## Usage

Add `"@feature-sliced/eslint-config/rules/public-api"` to your `extends` section in ESLint config.

#### Slices PublicAPI

```js
// 👎 Fail
import { Issues } from "pages/issues/ui";
import { IssueDetails } from "widgets/issue-details/ui/details"
import { AuthForm } from "features/auth-form/ui/form"
import { Button } from "shared/ui/button/button";
import { saveOrder } from "entities/order/model/actions";
import { orderModel } from "entities/order/model";
import { TicketCard } from "@/entities/ticket/ui";

// 👍 Pass
import { Issues } from "pages/issues";
import { IssueDetails } from "widgets/issue-details"
import { AuthForm } from "features/auth-form"
import { Button } from "shared/ui/button";
import { orderModel } from "entities/order";
import { TicketCard } from "@/entities/ticket";
import { AuthForm } from "features/auth/form"
import { Button } from "shared/ui";
```

#### Segments PublicAPI

```js
// 👍 Pass
/** @path features/smth/index.ts */
export { SubmitButton, SmthForm } from "./ui";
export * from "./model";
export * as smthModel from "./model";
export { selectSmthById, ... } from "./model";

// 👎 Fail
/** @path features/smth/index.ts */
export { SubmitButton } from "./ui/button";
export { SmthForm } from "./ui/form";
export * from "./model/actions";
export { selectSmthById } from "./model/selectors";
```

## Lite

**Without SegmentsAPI / InnerAPI restrictions** [(why experimental?)](https://github.com/feature-sliced/eslint-config/issues/90)

Add `"@feature-sliced/eslint-config/rules/public-api/lite"` to your `extends` section in ESLint config. (for `^0.1.0-beta.5` versions)

#### Slices PublicAPI

Without changes

```js
// 👍 Pass
import { orderModel } from "entities/order";
// 👎 Fail
import { orderModel } from "entities/order/model";
```

#### Segments PublicAPI

Less restricted with segments

```js
// 👍 Pass
/** @path features/smth/index.ts */
export { SubmitButton, SmthForm } from "./ui";
export * from "./model";
export * as smthModel from "./model";
export { selectSmthById, ... } from "./model";

// 👍 Also Pass
/** @path features/smth/index.ts */
export { SubmitButton } from "./ui/button";
export { SmthForm } from "./ui/form";
export * from "./model/actions";
export { selectSmthById } from "./model/selectors";
```

---

> ⚠️ **DANGEROUS-mode**: Support custom segments at shared by `_` prefix ([why?](https://github.com/feature-sliced/eslint-config/discussions/75#discussioncomment-1972319))
>
> Use carefully and at your own risk
>
> ```js
> import { ... } from "shared/lib"                 // 🟩 valid
> import { ... } from "shared/library"             // 🟥 not valid
>
> import { ... } from "shared/_library"            // 🟩 again valid
> import { ... } from "shared/_library/fp"         // 🟩 still valid
> import { ... } from "shared/_library/fp/compose" // 🟥 don't be brash :)
> ```

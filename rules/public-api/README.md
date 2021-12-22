# @feature-sliced/public-api

#### Reference: [PublicAPI](https://feature-sliced.design/docs/concepts/public-api)

#### Usage:
Add `"@feature-sliced/eslint-config/rules/public-api"` to you `extends` section in ESLint config.

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

# [@feature-sliced/eslint-plugin-messages](https://www.npmjs.com/package/@feature-sliced/eslint-plugin-messages)

> `WIP:` At the moment at alpha testing - [use carefully](https://github.com/feature-sliced/eslint-config/discussions/55)

<img src="https://avatars.githubusercontent.com/u/60469024?s=120&v=4" align="right">

Custom messages processing for [@feature-sliced/eslint-config](https://www.npmjs.com/package/@feature-sliced/eslint-config)

## Get Started

1. You'll first need to setup [@feature-sliced/eslint-config](https://www.npmjs.com/package/@feature-sliced/eslint-config)

2. Next, install `@feature-sliced/eslint-plugin-messages`

    ```sh
    $ npm install -D @feature-sliced/eslint-plugin-messages
    # or by yarn
    $ yarn add -D @feature-sliced/eslint-plugin-messages
    ```

3. Add config to the `plugins` and `processor` sections of your `.eslintrc` configuration file:

    ```json
    {
        "plugins": [
            ...
            "@feature-sliced/eslint-plugin-messages"
        ],
        "processor": "@feature-sliced/messages/fs",
    }
    ```

4. See result!

    ```js
    // Before
    > '"widgets" is not allowed to import "widgets" | See rules: https://feature-sliced.design/docs/reference/layers/overview'
    > 'Reaching to "features/search/ui" is not allowed.'
    > 'entities/auth/model` import should occur before import of `shared/config'
    // After
    > 'Violated isolation between layers or slices: "widgets" => "widgets" | https://git.io/Jymh2'
    > 'Violated usage of modules Public API | https://git.io/Jymjf'
    > 'Broken order of imports | https://git.io/JymjI'
    ```

## FAQ

### Why processor as plugin?

Because of [ESlint restrictions](https://eslint.org/docs/developer-guide/working-with-plugins#processors-in-plugins)

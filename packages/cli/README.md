# [@feature-sliced/eslint-config-cli](https://www.npmjs.com/package/@feature-sliced/config-cli)

> `WIP:` At the moment at beta-testing - [use carefully](https://github.com/feature-sliced/eslint-config/discussions/75)

<img src="https://avatars.githubusercontent.com/u/60469024?s=80&v=4" align="right">

CLI for more comfortable usage of [@feature-sliced/eslint-config](https://www.npmjs.com/package/@feature-sliced/eslint-config)

- Quick bootstraping with dependencies installing
- *TBA: Config customization*

## How it works?

CLI stores the dependencies necessary for @feature-sliced/eslint-config to work.  

1. **At start, it checks whether the project is a Typescript project**
    The package file is parsed.the user's json, and if the @types/* packages or the typescript package are found in it, the project is recognized as a TS project.

2. **Next, the ui-prompt is launched, which confirms the installation of TS packages from the user, and the installation in general.**
    With the consent of the user, the installation process is started, the presence of installed packages is checked by the user, in case of presence, the package is skipped (filtered), if started with force, all packages will be forcibly installed.

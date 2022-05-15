# Create IC

A simple command line tool to quickly create projects for the [Internet Computer](https://smartcontracts.org/).

<img src="https://github.com/peterpeterparker/create-ic/raw/main/docs/demo.gif" alt="Cli demo" role="presentation" />

## Usage

> Note that you will need to use npm 6 or higher.

```bash
npm init ic
```

An optional project name can also be passed to the command line:

```bash
npm init ic myproject
```

## What does it actually do?

This [npm](https://docs.npmjs.com/cli/v8/commands/npm-init) initializer is basically a shorthand to [dfx](https://smartcontracts.org/docs/current/references/cli-reference/dfx-parent/) - the command-line interface for managing Internet Computer projects.

1. It first checks if dfx is installed in your environment. If not, it prompts you to install it
2. If already installed, the script checks if a newer version of dfx is available and prompts you if you want to install it
3. Request a new project name and what type of canister should be created
4. Init a new project

## Limitation

It does not support yet Windows and might also not work behind a proxy.

## License

MIT © [David Dal Busco](mailto:david.dalbusco@outlook.com)

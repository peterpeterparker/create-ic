# Create IC

A simple command line tool to create projects for the [Internet Computer](https://smartcontracts.org/).

## What does it do?

This [npm](https://docs.npmjs.com/cli/v8/commands/npm-init) initializer is basically a shorthand to [dfx](https://smartcontracts.org/docs/current/references/cli-reference/dfx-parent/) - the command-line interface for managing Internet Computer projects.

1. It checks if dfx is installed in your environment. If not, it prompts you to install it.
2. If already installed, it checks if a newer version is available. If there is one, it prompts you for its optional installation.
3. Request a new project name and what type of canister should be created
4. Init a new project

## Usage

> Note that you will need to use npm 6 or higher.

```bash
npm init ic
```

An optional project name can also be passed to the command line:

```bash
npm init ic myproject
```

## Limitation

It does not support yet Windows and might also not work behind a proxy.

## License

MIT © [David Dal Busco](mailto:david.dalbusco@outlook.com)

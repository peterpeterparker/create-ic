# 0.3.0 (2022-10-18)

### Features

- detect if local `dfx` version is more recent than `latest` version - i.e. a `beta` - and do not prompt for update if so

### Build

- bump development dependencies

# 0.2.0 (2022-06-27)

### Features

- support for Internet Identity - cli prompts if an authentication is needed and if yes, set up II
- ask if a web application should be created or only backend - i.e. `dfx new --no-frontend`
- exist if target directory not empty - creating a project in a not empty folder is not supported by `dfx`
- more comprehensive confirm (`yes` and `no`)

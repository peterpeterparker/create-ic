import {cyan} from 'kleur';
import prompts from 'prompts';
import {spawn} from './cmd.utils';
import {downloadDfxManifest} from './download.utils';
import {confirm, confirmAndExit, NEW_CMD_LINE} from './prompt.utils';

let versionStore: string | undefined = undefined;

const isDfxAvailable = async (): Promise<boolean> => {
  const code = await spawn({
    command: 'command',
    args: ['-v', 'dfx'],
    stdout: () => {
      // No sdout needed for this check
    }
  });
  // 0: everything is alright
  // 1: an error occurred
  return code === 0;
};

const installDfx = (): Promise<number | null> =>
  spawn({command: 'sh', args: ['-ci', '"$(curl -fsSL https://sdk.dfinity.org/install.sh)"']});

export const promptDfxInstall = async (): Promise<{status: 'available' | 'installed'}> => {
  if (await isDfxAvailable()) {
    return {status: 'available'};
  }

  await confirmAndExit(
    `dfx - the command-line interface for managing Internet Computer projects - is required.${NEW_CMD_LINE}Continue with its ${cyan(
      'installation'
    )}?`
  );

  await installDfx();

  return {status: 'installed'};
};

const fetchVersion = async (): Promise<string> => {
  let version;
  const callback = (output: string) => (version = output.replace('dfx', '').trim());

  await spawn({command: 'dfx', args: ['--version'], stdout: callback});

  return version;
};

const dfxVersion = async (): Promise<string> => {
  if (versionStore !== undefined) {
    return versionStore;
  }

  versionStore = await fetchVersion();

  return versionStore;
};

// v0.10.0 - https://github.com/dfinity/sdk/blob/master/CHANGELOG.adoc#feat-use-null-as-default-value-for-opt-arguments
export const dfxDefaultNullArguments = async (): Promise<boolean> => {
  const version = await dfxVersion();

  return version.localeCompare('0.10.0', undefined, {numeric: true, sensitivity: 'base'}) > -1;
};

const dfxUpgrade = async (): Promise<number | null> => spawn({command: 'dfx', args: ['upgrade']});

export const promptDfxVersion = async () => {
  const {
    tags: {latest}
  } = await downloadDfxManifest();

  const version = await dfxVersion();

  if (version === latest) {
    return;
  }

  const [_latestMajor, latestMinor, _latestPatch] = latest.split('.');
  const [_localMajor, localMinor, localPatch] = version.split('.');

  if (parseInt(latestMinor) < parseInt(localMinor) && localPatch.toLowerCase().includes('beta')) {
    return;
  }

  const answer = await confirm(
    `A new version of dfx (v${latest}) was promoted.${NEW_CMD_LINE}Do you want to ${cyan(
      'upgrade'
    )} now?`
  );

  if (!answer) {
    return;
  }

  await dfxUpgrade();
};

export const promptDfxCanisterType = async (): Promise<DfxCanisterType> => {
  const {type} = await prompts({
    type: 'select',
    name: 'type',
    message: 'What type of backend canister?',
    choices: [
      {title: 'Motoko', value: 'motoko'},
      {title: 'Rust', value: 'rust'}
    ],
    initial: 0
  });

  // In case of control+c
  if (type === undefined || type === '') {
    process.exit(1);
  }

  return type;
};

export const dfxNewProject = async ({
  project,
  type,
  noFrontend
}: {
  project: string;
  type: DfxCanisterType;
  noFrontend: boolean;
}): Promise<number | null> =>
  spawn({
    command: 'dfx',
    args: ['new', project, '--type', type, ...(noFrontend ? ['--no-frontend'] : [])]
  });

export const promptDfxNoFrontend = async (): Promise<boolean> => {
  const {type} = await prompts({
    type: 'select',
    name: 'type',
    message: 'What kind of project?',
    choices: [
      {title: 'Frontend (web application) + backend', value: 'frontend'},
      {title: 'Backend only', value: 'backend'}
    ],
    initial: 0
  });

  // In case of control+c
  if (type === undefined || type === '') {
    process.exit(1);
  }

  return type === 'backend';
};

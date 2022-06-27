import {readFile, writeFile} from 'fs/promises';
import {green} from 'kleur';
import {confirm} from './prompt.utils';

export const promptIIInstall = async (): Promise<boolean> =>
  confirm('Do you need authentication (Internet Identity)?');

const II_WASM_LOCAL_FILE = 'internet_identity.wasm';
const II_CANDID_LOCAL_FILE = 'internet_identity.did';

const II_LATEST_WASM = `https://github.com/dfinity/internet-identity/releases/latest/download/internet_identity_dev.wasm`;
const II_LATEST_CANDID = `https://raw.githubusercontent.com/dfinity/internet-identity/main/src/internet_identity/internet_identity.did`;

const updateDfxJson = async (dir: string) => {
  const dfxJsonFilePath: string = `${dir}/dfx.json`;

  const dfxJson: DfxJson = JSON.parse(await readFile(dfxJsonFilePath, 'utf-8'));

  const {canisters}: DfxJson = dfxJson;

  const testAndDownload = ({url, filename}: {url: string; filename: string}): string =>
    `test -f ${filename} || curl -sSL ${url} -o ${filename}`;

  const dfxJsonWithII: DfxJson = {
    ...dfxJson,
    canisters: {
      ...canisters,
      internet_identity: {
        type: 'custom',
        candid: II_CANDID_LOCAL_FILE,
        wasm: II_WASM_LOCAL_FILE,
        build: `bash -c '${testAndDownload({
          url: II_LATEST_WASM,
          filename: II_WASM_LOCAL_FILE
        })}; ${testAndDownload({url: II_LATEST_CANDID, filename: II_CANDID_LOCAL_FILE})}'`,
        remote: {
          candid: II_CANDID_LOCAL_FILE,
          id: {
            ic: 'rdmx6-jaaaa-aaaaa-aaadq-cai'
          }
        }
      }
    }
  } as DfxJson;

  await writeFile(dfxJsonFilePath, JSON.stringify(dfxJsonWithII, null, 2), 'utf-8');
};

const updateGitIgnore = async (dir: string) => {
  const gitIgnoreFilePath: string = `${dir}/.gitignore`;

  const gitIgnore: string = await readFile(gitIgnoreFilePath, 'utf-8');

  const gitIgnoreII: string = `${gitIgnore}\n\n${II_WASM_LOCAL_FILE}\n${II_CANDID_LOCAL_FILE}`;

  await writeFile(gitIgnoreFilePath, gitIgnoreII, 'utf-8');
};

export const addIIToProject = async (dir: string) => {
  console.log('Adding Internet Identity...');

  await Promise.all([updateDfxJson(dir), updateGitIgnore(dir)]);

  console.log(`II installed ${green('✔')}\n`);
};

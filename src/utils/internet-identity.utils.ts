import {readFile, writeFile} from 'fs/promises';
import {green} from 'kleur';
import {
  II_CANDID_LOCAL_FILE,
  II_LATEST_CANDID,
  II_LATEST_WASM,
  II_WASM_LOCAL_FILE
} from '../constants/internet-identity.constants';
import {confirm} from './prompt.utils';
import {appendIIToGitIgnore} from "./gitignore.utils";

export const promptIIInstall = async (): Promise<boolean> =>
  confirm('Do you need authentication (Internet Identity)?');

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

export const addIIToProject = async (dir: string) => {
  console.log('Adding Internet Identity...');

  await Promise.all([updateDfxJson(dir), appendIIToGitIgnore(dir)]);

  console.log(`II installed ${green('✔')}\n`);
};

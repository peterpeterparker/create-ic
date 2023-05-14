import {readFile, writeFile} from 'fs/promises';
import {green} from 'kleur';
import {
  II_CANDID_FILE,
  II_LATEST_CANDID,
  II_LATEST_WASM
} from '../constants/internet-identity.constants';
import {appendIIToGitIgnore} from './gitignore.utils';
import {confirm} from './prompt.utils';

export const promptIIInstall = async (): Promise<boolean> =>
  confirm('Do you need authentication (Internet Identity)?');

const updateDfxJson = async (dir: string) => {
  const dfxJsonFilePath: string = `${dir}/dfx.json`;

  const dfxJson: DfxJson = JSON.parse(await readFile(dfxJsonFilePath, 'utf-8'));

  const {canisters}: DfxJson = dfxJson;

  const dfxJsonWithII: DfxJson = {
    ...dfxJson,
    canisters: {
      ...canisters,
      internet_identity: {
        type: 'custom',
        candid: II_LATEST_CANDID,
        wasm: II_LATEST_WASM,
        shrink: false,
        remote: {
          candid: II_CANDID_FILE,
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

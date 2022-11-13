import {readFile, writeFile} from 'fs/promises';
import {II_CANDID_LOCAL_FILE, II_WASM_LOCAL_FILE} from '../constants/internet-identity.constants';

const gitIgnoreFilePath = (dir: string): string => `${dir}/.gitignore`;

const readGitIgnore = (dir: string): Promise<string> => readFile(gitIgnoreFilePath(dir), 'utf-8');

export const removeDeclarationsGitIgnore = async (dir: string) => {
  const gitIgnore: string = await readGitIgnore(dir);

  const gitIgnoreWithoutComment: string = gitIgnore.replace(/# generated files/g, '');
  const gitIgnoreWithoutDeclarations: string = gitIgnoreWithoutComment.replace(
    /src\/declarations\//g,
    ''
  );

  await writeFile(gitIgnoreFilePath(dir), gitIgnoreWithoutDeclarations, 'utf-8');
};

export const appendIIToGitIgnore = async (dir: string) => {
  const gitIgnore: string = await readGitIgnore(dir);

  const gitIgnoreII: string = `${gitIgnore}\n\n${II_WASM_LOCAL_FILE}\n${II_CANDID_LOCAL_FILE}`;

  await writeFile(gitIgnoreFilePath(dir), gitIgnoreII, 'utf-8');
};

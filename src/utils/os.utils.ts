import {cyan, red} from 'kleur';

export const isWindows = (): boolean => process.platform === 'win32';

export const osDisclaimer = `
${red('Windows')} is not yet supported by this CLI.
Contributions on ${cyan('https://github.com/peterpeterparker/create-ic')} are welcomed.
`;

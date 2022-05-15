import {ChildProcessWithoutNullStreams, spawn as spawnCommand} from 'child_process';
import {existsSync, readdirSync} from 'fs';
import {confirmAndExit} from './prompt.utils';

export const spawn = ({
  command,
  args,
  stdout
}: {
  command: string;
  args?: ReadonlyArray<string>;
  stdout?: (output: string) => void;
}): Promise<number | null> => {
  return new Promise<number | null>((resolve, reject) => {
    const process: ChildProcessWithoutNullStreams = spawnCommand(command, args);

    process.stdout.on('data', (data) => {
      if (stdout) {
        stdout(`${data}`);
        return;
      }

      console.log(`${data}`);
    });
    process.stderr.on('data', (data) => console.error(`${data}`));

    process.on('close', (code) => resolve(code));
    process.on('error', (err) => reject(err));
  });
};

export const assertEmptyFolder = async (dir: string) => {
  if (!existsSync(dir)) {
    return;
  }

  if (readdirSync(dir).length <= 0) {
    return;
  }

  await confirmAndExit('Directory not empty. Continue?');
};

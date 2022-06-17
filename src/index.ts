import {gray} from 'kleur';
import {version} from '../package.json';
import {assertEmptyFolder} from './utils/cmd.utils';
import {
  dfxNewProject,
  promptDfxCanisterType,
  promptDfxInstall, promptDfxNoFrontend,
  promptDfxVersion
} from './utils/dfx.utils';
import {isWindows, osDisclaimer} from './utils/os.utils';
import {promptProject} from './utils/project.utils';
import {addIIToProject, promptIIInstall} from './utils/internet-identity.utils';
import {nextStepsDisclaimer} from './utils/info.utils';

export const main = async () => {
  console.log(gray(`\ncreate-ic version ${version}`));

  if (isWindows()) {
    console.log(osDisclaimer);
    return;
  }

  const {status} = await promptDfxInstall();

  if (status === 'available') {
    await promptDfxVersion();
  }

  const project: string = await promptProject();
  await assertEmptyFolder(project);

  const type: DfxCanisterType = await promptDfxCanisterType();
  const noFrontend: boolean = await promptDfxNoFrontend();

  const installII: boolean = noFrontend ? false : await promptIIInstall();

  await dfxNewProject({project, type, noFrontend});

  if (!installII) {
    nextStepsDisclaimer({installII, dir: project});
    return;
  }

  await addIIToProject(project);

  nextStepsDisclaimer({installII, dir: project});
};

(async () => {
  try {
    await main();
  } catch (err: unknown) {
    console.error('Unexpected error', err);
  }
})();

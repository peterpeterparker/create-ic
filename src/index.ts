import {gray} from 'kleur';
import {version} from '../package.json';
import {assertEmptyFolder} from './utils/cmd.utils';
import {
  dfxDefaultNullArguments,
  dfxNewProject,
  promptDfxCanisterType,
  promptDfxInstall,
  promptDfxNoFrontend,
  promptDfxVersion
} from './utils/dfx.utils';
import {removeDeclarationsGitIgnore} from './utils/gitignore.utils';
import {nextStepsDisclaimer} from './utils/info.utils';
import {addIIToProject, promptIIInstall} from './utils/internet-identity.utils';
import {isWindows, osDisclaimer} from './utils/os.utils';
import {promptProject} from './utils/project.utils';

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

  const noFrontend: boolean = await promptDfxNoFrontend();
  const type: DfxCanisterType = await promptDfxCanisterType();

  const installII: boolean = noFrontend ? false : await promptIIInstall();

  await dfxNewProject({project, type, noFrontend});

  await removeDeclarationsGitIgnore(project);

  const dfxNullArguments = await dfxDefaultNullArguments();

  if (!installII) {
    nextStepsDisclaimer({installII, dir: project, dfxNullArguments});
    return;
  }

  await addIIToProject(project);

  nextStepsDisclaimer({installII, dir: project, dfxNullArguments});
};

(async () => {
  try {
    await main();
  } catch (err: unknown) {
    console.error('Unexpected error', err);
  }
})();

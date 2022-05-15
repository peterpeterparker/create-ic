import {cyan, red} from 'kleur';
import prompts from 'prompts';
import {NEW_CMD_LINE} from './prompt.utils';

export const promptProject = async (): Promise<string> => {
  const project = process.argv[2];

  if (project !== undefined && project !== '.') {
    return project;
  }

  const {userProject} = await prompts([
    {
      type: 'text',
      name: 'userProject',
      message: `What's the ${cyan(
        'name'
      )} of your project?${NEW_CMD_LINE}(a new directory will be created)`
    }
  ]);

  if (userProject === undefined || userProject === '') {
    console.log(`${red('A project name is mandatory')}`);
    process.exit(1);
  }

  return userProject;
};

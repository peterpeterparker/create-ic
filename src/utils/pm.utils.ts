import {isNullish} from '@junobuild/utils';

export type PM = 'npm' | 'yarn' | 'pnpm' | 'bun';

export const whichPMRuns = (): PM => {
  const {
    env: {npm_config_user_agent}
  } = process;

  if (isNullish(npm_config_user_agent)) {
    return 'npm';
  }

  const {name} = pmFromUserAgent(npm_config_user_agent);

  switch (name) {
    case 'yarn':
      return 'yarn';
    case 'pnpm':
      return 'pnpm';
    case 'bun':
      return 'bun';
    default:
      return 'npm';
  }
};

/**
 * Source: https://github.com/zkochan/packages/tree/main/which-pm-runs
 */
const pmFromUserAgent = (userAgent: string): {name: string; version: string} => {
  const pmSpec = userAgent.split(' ')[0];
  const separatorPos = pmSpec.lastIndexOf('/');
  const name = pmSpec.substring(0, separatorPos);
  return {
    name: name === 'npminstall' ? 'cnpm' : name,
    version: pmSpec.substring(separatorPos + 1)
  };
};

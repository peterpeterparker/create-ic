import {cyan} from 'kleur';

// TODO if version < 0.10 ? --argument '(null)' : ''

export const nextStepsDisclaimer = ({installII, dir}: {installII: boolean; dir: string}) =>
  console.log(`\nNext steps:
  1: cd ${cyan(dir)}
  2: ${cyan('dfx start --background --clean')}
      3: ${cyan(`dfx deploy${installII ? " --no-wallet --argument '(null)'" : ''}`)}
`);

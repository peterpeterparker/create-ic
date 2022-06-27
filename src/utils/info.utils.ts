import {cyan} from 'kleur';

export const nextStepsDisclaimer = ({
  installII,
  dir,
  dfxNullArguments
}: {
  installII: boolean;
  dir: string;
  dfxNullArguments: boolean;
}) =>
  console.log(`\nNext steps:
  1: cd ${cyan(dir)}
  2: ${cyan('dfx start --background --clean')}
  3: ${cyan(
    `dfx deploy${installII ? ` --no-wallet${!dfxNullArguments ? " --argument '(null)'" : ''}` : ''}`
  )}
`);

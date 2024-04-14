import {execute} from '@junobuild/cli-tools';
import {cyan, gray} from 'kleur';
import prompts from 'prompts';
import {version} from '../package.json';
import {whichPMRuns} from './utils/pm.utils';

export const main = async () => {
  console.log(`\n     [0m [0m [0m [0m [0m [0m [0m [0m[48;5;38m [0m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;202m [0m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;208m [0m [0m [0m [0m [0m [0m [0m [0m
     [0m [0m [0m [0m [0m [0m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;208m[48;5;202m [0m[48;5;208m[48;5;208m [0m[48;5;208m[48;5;208m [0m[48;5;208m[48;5;208m [0m[48;5;209m[48;5;208m [0m[48;5;209m [0m [0m [0m [0m [0m
     [0m [0m [0m [0m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;68m[48;5;38m [0m[48;5;61m[48;5;38m [0m[48;5;60m[48;5;38m [0m[48;5;60m[48;5;32m [0m[48;5;54m[48;5;68m [0m[48;5;54m[48;5;68m [0m[48;5;60m[48;5;68m [0m[48;5;60m[48;5;38m [0m[48;5;61m[48;5;38m [0m[48;5;74m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m [0m [0m [0m [0m [0m [0m [0m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;208m[48;5;202m [0m[48;5;208m[48;5;208m [0m[48;5;208m[48;5;208m [0m[48;5;208m[48;5;208m [0m[48;5;209m[48;5;208m [0m[48;5;209m[48;5;209m [0m[48;5;209m[48;5;209m [0m[48;5;209m[48;5;209m [0m[48;5;209m[48;5;209m [0m[48;5;215m [0m [0m [0m
     [0m [0m [0m[48;5;38m[48;5;38m [0m[48;5;68m[48;5;38m [0m[48;5;60m[48;5;68m [0m[48;5;54m[48;5;61m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m [0m[48;5;90m [0m[48;5;125m [0m[48;5;67m [0m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m [0m [0m [0m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m [0m[48;5;202m [0m[48;5;202m [0m[48;5;202m [0m[48;5;202m [0m[48;5;208m [0m[48;5;208m[48;5;208m [0m[48;5;209m[48;5;208m [0m[48;5;209m[48;5;209m [0m[48;5;209m[48;5;209m [0m[48;5;209m[48;5;209m [0m[48;5;209m[48;5;209m [0m[48;5;215m[48;5;209m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m [0m [0m
     [0m [0m[48;5;67m[48;5;45m [0m[48;5;60m[48;5;67m [0m[48;5;54m[48;5;60m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;167m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;209m [0m[48;5;209m[48;5;209m [0m[48;5;209m[48;5;209m [0m[48;5;215m[48;5;209m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m [0m
     [0m[48;5;54m [0m[48;5;54m[48;5;60m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;90m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;67m [0m[48;5;102m[48;5;166m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m
     [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;90m[48;5;54m [0m[48;5;90m[48;5;90m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;74m[48;5;102m [0m[48;5;138m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m[48;5;202m [0m[48;5;202m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m
     [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;54m[48;5;54m [0m[48;5;90m[48;5;54m [0m[48;5;90m[48;5;90m [0m[48;5;90m[48;5;90m [0m[48;5;90m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;162m [0m[48;5;198m[48;5;97m [0m[48;5;162m[48;5;68m [0m[48;5;67m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;74m [0m[48;5;38m[48;5;74m [0m[48;5;38m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m
     [0m[48;5;54m[48;5;54m [0m[48;5;90m[48;5;54m [0m[48;5;90m[48;5;54m [0m[48;5;90m[48;5;90m [0m[48;5;90m[48;5;90m [0m[48;5;90m[48;5;90m [0m[48;5;90m[48;5;90m [0m[48;5;90m[48;5;90m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;162m [0m[48;5;168m[48;5;68m [0m[48;5;68m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m
     [0m [0m[48;5;90m[48;5;90m [0m[48;5;90m[48;5;90m [0m[48;5;90m[48;5;90m [0m[48;5;90m[48;5;90m [0m[48;5;90m[48;5;90m [0m[48;5;90m[48;5;90m [0m[48;5;126m[48;5;90m [0m[48;5;126m[48;5;126m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;198m [0m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;168m [0m[48;5;68m[48;5;74m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m [0m[48;5;38m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;179m[48;5;215m [0m[48;5;109m[48;5;179m [0m[48;5;108m [0m
     [0m [0m[48;5;90m [0m[48;5;90m[48;5;90m [0m[48;5;90m[48;5;90m [0m[48;5;90m[48;5;90m [0m[48;5;126m[48;5;90m [0m[48;5;126m[48;5;126m [0m[48;5;126m[48;5;126m [0m[48;5;126m[48;5;126m [0m[48;5;126m[48;5;126m [0m[48;5;126m[48;5;162m [0m[48;5;162m [0m [0m [0m [0m [0m [0m[48;5;162m [0m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m [0m [0m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m [0m[48;5;38m [0m [0m [0m [0m [0m[48;5;215m [0m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;215m[48;5;215m [0m[48;5;179m[48;5;215m [0m[48;5;73m[48;5;215m [0m[48;5;38m[48;5;109m [0m[48;5;39m[48;5;38m [0m [0m
     [0m [0m [0m[48;5;90m [0m[48;5;126m[48;5;126m [0m[48;5;126m[48;5;126m [0m[48;5;126m[48;5;126m [0m[48;5;126m[48;5;126m [0m[48;5;126m[48;5;126m [0m[48;5;126m[48;5;126m [0m[48;5;126m[48;5;126m [0m[48;5;162m[48;5;126m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;198m[48;5;162m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m [0m [0m [0m [0m [0m [0m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;74m[48;5;144m [0m[48;5;109m[48;5;215m [0m[48;5;144m[48;5;215m [0m[48;5;179m[48;5;215m [0m[48;5;179m[48;5;215m [0m[48;5;143m[48;5;215m [0m[48;5;144m[48;5;215m [0m[48;5;109m[48;5;215m [0m[48;5;74m[48;5;179m [0m[48;5;38m[48;5;144m [0m[48;5;38m[48;5;74m [0m[48;5;38m[48;5;38m [0m[48;5;38m [0m [0m [0m
     [0m [0m [0m [0m [0m[48;5;126m [0m[48;5;126m[48;5;126m [0m[48;5;126m[48;5;126m [0m[48;5;126m[48;5;126m [0m[48;5;162m[48;5;126m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;198m[48;5;162m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;74m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m [0m [0m [0m [0m
     [0m [0m [0m [0m [0m [0m [0m[48;5;126m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;162m[48;5;162m [0m[48;5;198m[48;5;162m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m[48;5;198m [0m[48;5;198m [0m[48;5;198m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;38m [0m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m[48;5;38m [0m[48;5;38m [0m [0m [0m [0m [0m [0m [0m
     [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;162m [0m[48;5;162m [0m[48;5;162m [0m[48;5;198m [0m[48;5;198m [0m[48;5;198m [0m[48;5;198m [0m[48;5;198m [0m[48;5;198m [0m[48;5;198m [0m[48;5;198m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m[48;5;38m [0m[48;5;38m [0m[48;5;38m [0m[48;5;38m [0m[48;5;38m [0m[48;5;38m [0m[48;5;38m [0m[48;5;38m [0m[48;5;38m [0m[48;5;38m [0m[48;5;38m [0m [0m [0m [0m [0m [0m [0m [0m [0m [0m
     [0m`);

  console.log(gray(`\ncreate-ic version ${version}\n`));

  console.log("Let's get started on the Internet Computer!\n");

  const {start}: {start: 'juno' | 'icp' | undefined} = await prompts({
    type: 'select',
    name: 'start',
    message: 'Select a development path to get started',
    choices: [
      {title: 'Juno', value: 'juno'},
      {title: 'No framework', value: 'icp'}
    ]
  });

  if (start === undefined) {
    process.exit(0);
  }

  if (start === 'icp') {
    console.log(
      `\nFind all the resources you need to get started in the Internet Computer documentation: ${cyan('https://internetcomputer.org/docs')}`
    );
    return;
  }

  console.log(
    '\nYou have chosen wisely 😉. Let’s begin creating your new project with the Juno CLI.\n'
  );

  const pm = whichPMRuns();

  switch (pm) {
    case 'yarn':
    case 'pnpm': {
      await execute({
        command: pm,
        args: ['create', `juno`]
      });
      return;
    }
    default:
      await execute({
        command: pm,
        args: ['create', `juno@latest`]
      });
  }
};

(async () => {
  try {
    await main();
  } catch (err: unknown) {
    console.error('Unexpected error', err);
  }
})();

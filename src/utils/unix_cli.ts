import { execSync } from 'child_process';
import { inspect } from 'util';

interface CliParam {
  /** True if you wanna get result of this cli as string */
  getOutput?: boolean;
  /** True if you don't want to raise Exception if it happens */
  silent?: boolean;
}
export function run_cli(param: CliParam, ...args: string[]): [boolean, string] {
  const fullCli = args.join(' ');
  let res = '';
  let success = false;
  const getOutput = param.getOutput ?? false;
  const silent = param.silent ?? true;
  try {
    const extraOptions = getOutput ? {} : { stdio: 'inherit' };
    const options: any = { encoding: 'utf-8', ...extraOptions };
    console.log(`fullCli = ${fullCli}`);
    res = execSync(fullCli, options);
    success = true;
  } catch (error) {
    console.log(`run CLI error :\n${inspect(error)}`);
    success = false;
    if (!silent) throw error;
  }
  if (getOutput) {
    console.log(`cliOutput =\n${res}`);
  }
  return [success, res];
}

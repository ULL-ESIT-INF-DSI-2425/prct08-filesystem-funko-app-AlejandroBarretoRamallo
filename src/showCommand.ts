import fs from 'fs';
import path from 'path';
import { ArgumentsCamelCase, Argv } from 'yargs';
import { FunkoPop } from './funkoPop.js';
import { printFunko } from './listCommand.js';
import chalk from 'chalk';

/**
 * Obligatory options for show command
 */
export interface ShowFunko {
  user: string,
  id: number
}

export const log = console.log

/**
 * Show command wiht obligatory options
 */
export const showCommand = {
  command: 'show',
  describe: 'shows information of a concrete funko',
  builder: (yargs: Argv) => {
    return yargs 
    .option('user', {
      description: 'username',
      type: 'string',
      demmandOption: true
    })
    .option('id', {
      description: 'funko id',
      type: 'number',
      demmandOption: true
    })
  },
  handler: (args: ArgumentsCamelCase<ShowFunko>) => {
    showFunko(args.user, args.id)
  }
}

/**
 * 
 * @param user - username
 * @param id Funko id
 */
export function showFunko(user: string, id: number): void {
  fs.readFile(path.join(process.cwd(), `/${user}/${user}.json`), (err, data) => {
    if (err) {
      log(chalk.red('Error reading the file'))
    }
    else {
      let JSONdata = JSON.parse(data.toString()) as FunkoPop[]
      JSONdata = JSONdata.filter(funko => {
        return funko.id === id
      })
      if (JSONdata.length === 0) {
        log(chalk.red(`Error: the funko ${id} is not on th elist`))
      }
      else {
        printFunko(JSONdata[0])
      }
    }
  })
}
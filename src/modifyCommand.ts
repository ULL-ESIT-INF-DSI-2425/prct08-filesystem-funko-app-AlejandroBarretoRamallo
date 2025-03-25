import { FunkoPop, funkoType, gender } from "./funkoPop.js";
import { Argv, ArgumentsCamelCase} from "yargs";
import { checkPath } from "./addCommand.js";
import fs from 'fs'
import path from "path";
import chalk from "chalk";

/**
 * Obligatory options to modify a funko
 */
export interface ModifyFunko {
  user: string,
  id: number,
  name: string,
  desc: string,
  type: funkoType,
  gender: gender,
  franq: string,
  number: number,
  exclusive: boolean,
  scar: string,
  value: number
}

export const log = console.log

/**
 * Modify command wiht obligatory options
 */
export const modifyCommand = {
  command: 'modify',
  describe: 'modify a funko',
  builder: (yargs: Argv) => {
    return yargs
      .option('user', {
        description: 'username',
        type: 'string', 
        demandOption: true,
      })
      .option('id', {
        description: 'Funko ID',
        type: 'number', 
        demandOption: true,
      })
      .option('name', {
        description: 'Funko name',
        type: 'string',
        demandOption: true,
      })
      .option('desc', {
        description: 'description of the funko',
        type: 'string',
        demandOption: true,
      })
      .option('type', {
        description: 'Type of the funko',
        type: 'string', 
        demandOption: true,
        choices: Object.values(funkoType), 
      })
      .option('gender', {
        description: 'Gender of the funko',
        type: 'string',
        demandOption: true,
        choices: Object.values(gender),
      })
      .option('franq', {
        description: 'Franquise of the funko',
        type: 'string',
        demandOption: true,
      })
      .option('number', {
        description: 'number of the funko on the franquise',
        type: 'number',
        demandOption: true,
      })
      .option('exclusive', {
        description: 'If its exclusive',
        type: 'boolean', 
        demandOption: true,
      })
      .option('scar', {
        description: 'Special characteristics of the funko',
        type: 'string',
        demandOption: true,
      })
      .option('value', {
        description: 'Market value',
        type: 'number', 
        demandOption: true,
      });
  },
  handler: (argv: ArgumentsCamelCase<ModifyFunko>) => {
    const funko: FunkoPop = {
      id: argv.id,
      nombre: argv.name,
      descripcion: argv.desc,
      tipo: argv.type,
      genero: argv.gender,
      franquicia: argv.franq,
      numero: argv.number,
      esExclusivo: argv.exclusive,
      caracteristicasEspeciales: argv.scar,
      valorMercado: argv.value,
    }
    checkPath(argv.user, () => {
      modifyFunko(argv.user,funko)
    });
  }
};

/**
 * Searchs a id on a list and modifies the funko with that id if it exists
 * @param user - Username
 * @param funko Funkopop
 */
export function modifyFunko(user: string, funko: FunkoPop): void {
  fs.readFile(path.join(process.cwd(), `/${user}/${user}.json`), (err, data) => {
    if (err) {
      log(chalk.red('Error reading the file'))
    }
    else {
      let JSONdata = JSON.parse(data.toString()) as FunkoPop[]
      let searchedFunko = JSONdata.filter(Funko => {
        return Funko.id === funko.id
      })
      if (searchedFunko.length === 0) {
        log(chalk.red(`Error: the funko ${funko.id} is not registered on the list`))
      }
      else {
        JSONdata = JSONdata.filter(Funko => {
          return Funko.id !== funko.id
        })
        JSONdata.push(funko)
        fs.writeFile(path.join(process.cwd(), `/${user}/${user}.json`), JSON.stringify(JSONdata, null, 2), (err) => {
          if (err) {
            log(chalk.red('Error writing the file'))
          }
          else {
            log(chalk.green('Funko modified succesfully'))
          }
        })
     }
    }
  })
}

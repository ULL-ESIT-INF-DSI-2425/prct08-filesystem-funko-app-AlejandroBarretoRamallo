import path from "path";
import { FunkoPop, funkoType, gender } from "./funkoPop.js";
import fs from 'fs';
import { Argv, ArgumentsCamelCase} from "yargs";
import chalk from "chalk";

export const log = console.log

/**
 * Represents the interface that must be using when adding funko
 */
export interface AddFunko {
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

/**
 * Checks if the user's directory and file .json is created or creates it if not
 * @param user - Username
 * @param callback - Async function to be called after creating a directory and  a file
 */
export function checkPath(user: string, callback: () => void): void {
  const dirPath = path.join(process.cwd(), `/${user}`);
  const filePath = path.join(process.cwd(), `/${user}/${user}.json`);

  fs.access(dirPath, (err) => {
    if (err) {
      log(chalk.green(`Creating ${user} directory`))
      fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
          log(chalk.red('Error creating directory'))
        }
        else {
          log(chalk.green('Directory created succesfully'))
        }
      });
    }
    fs.access(filePath, (err) => {
      if (err) {
        fs.writeFile(filePath, `[]`, (err) => {
          if (err) {
            log(chalk.red('Error writing the file'))
          }
          else {
           log(chalk.green('File created successfully'));
          }
        });
      }
      callback()
    });
  });
}

/**
 * The command add with its multiple obligatory options
 */
export const addCommand = {
  command: 'add',
  describe: 'add Funko',
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
  handler: (argv: ArgumentsCamelCase<AddFunko>) => {
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
      addFunko(funko, argv.user)
    })
  }
};

/**
 * Reads a list of funkopops and if the id is not registered, adds another funko to the list of specified user
 * @param funko - Funko pop object
 * @param user - Username
 */
export function addFunko(funko: FunkoPop, user: string): void {
  fs.readFile(path.join(process.cwd(), `/${user}/${user}.json`), (err, data) => {
    if (err) {
      log(chalk.red('Error reading the file'))
    }
    else {
      let JSONdata = JSON.parse(data.toString()) as FunkoPop[]
      let wantedID = JSONdata.filter(Funko => {
        return Funko.id === funko.id
      })
      if (wantedID.length !== 0) {
        log(chalk.red('Error: funko already added'))
      }
      else {
        JSONdata.push(funko)
        fs.writeFile(path.join(process.cwd(), `/${user}/${user}.json`), JSON.stringify(JSONdata, null, 2), (err) => {
          if (err) {
            log(chalk.red('Error trying to write on the file'))
          }
          else {
            log(chalk.green(`Funko added to ${user}'s list`))
          }
        })
      }
    }
  })
}

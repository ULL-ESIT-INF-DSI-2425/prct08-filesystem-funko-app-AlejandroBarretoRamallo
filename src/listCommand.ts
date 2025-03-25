import { Argv, ArgumentsCamelCase} from "yargs";
import { checkPath } from "./addCommand.js";
import { argv } from "process";
import fs from 'fs'
import path from "path";
import { FunkoPop } from "./funkoPop.js";
import chalk from "chalk";

/**
 * Obligatory optiosn for list command
 */
export interface ListFunko {
  user: string
}

export const log = console.log

/**
 * The list command with obligatory options
 */
export const listCommand = {
  command: 'list',
  describe: 'list all funkos',
  builder: (yargs: Argv) => {
    return yargs 
    .option('user', {
      description: 'username',
      type: 'string',
      demmandOption: true
    })
  },
  handler: (args: ArgumentsCamelCase<ListFunko>) => {
    checkPath(args.user, () => {
      listFunko(args.user)
    })
  }
}

/**
 * Prints each funkopop of a list
 * @param user - Username
 */
export function listFunko(user: string): void {
  fs.readFile(path.join(process.cwd(), `/${user}/${user}.json`), (err, data) => {
    let JSONdata = JSON.parse(data.toString()) as FunkoPop[]
    if (JSONdata.length === 0) {
      log(chalk.red(`Error: the user ${user}'s list is empty`))
    }
    else {
      JSONdata.forEach(funko => {
        printFunko(funko)
      })
    }
  })
}
/**
 * Prints information of a funkopop
 * @param funko A funkopop
 */
export function printFunko(funko: FunkoPop): void {
  console.log('-------------------------------------')
  console.log(`Funko id: ${funko.id}`)
  console.log(`Funko name: ${funko.nombre}`)
  console.log(`Funko description: ${funko.descripcion}`)
  console.log(`Funko type: ${funko.tipo}`)
  console.log(`Funko gender: ${funko.genero}`)
  console.log(`Funko franquise: ${funko.franquicia}`)
  console.log(`Funko franquise id: ${funko.numero}`)
  funko.esExclusivo? console.log('This funko is exclusive') : console.log('This funko is not exclusive')
  console.log(`Special caracteristics: ${funko.caracteristicasEspeciales}`)
  console.log(`Market value: ${funko.valorMercado}`)
}
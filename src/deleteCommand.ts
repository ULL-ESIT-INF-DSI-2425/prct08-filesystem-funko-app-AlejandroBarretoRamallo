import { ArgumentsCamelCase, Argv} from "yargs"
import { checkPath } from "./addCommand.js"
import path from "path"
import fs from 'fs'
import { FunkoPop } from "./funkoPop.js"
import chalk from "chalk"

/**
 * Obligatory options
 */
export interface deleteFunko {
  user: string,
  id: number
}

export const log = console.log


/**
 * Search on a list of funko and if the id is found, its deleted from the list
 * @param user - username
 * @param id Funko id to be deleted
 */
export function deleteFunko(user: string, id: number): void {
  fs.readFile(path.join(process.cwd(), `/${user}/${user}.json`), (err, data) => {
    if (err) {
      log(chalk.red('Error reading the file'))
    }
    else {
      let JSONdata = JSON.parse(data.toString()) as FunkoPop[]
      let searchedID = JSON.parse(data.toString()) as FunkoPop[]
      searchedID = searchedID.filter(funko => {
        return funko.id === id
      })
      if (searchedID.length === 0) {
        log(chalk.red(`Error: funko with ID ${id} was not in the list`))
      }
      else {
        JSONdata = JSONdata.filter(funko => {
          return funko.id !== id
        })
        fs.writeFile(path.join(process.cwd(), `/${user}/${user}.json`), JSON.stringify(JSONdata, null, 2), (err) => {
          if (err) {
            log(chalk.red('Error writing on the file'))
          }
          else {
           log(chalk.green(`Funko wiht ID ${id} deleted succesfully`))
          }
        })
      }
    }
  })
}

/**
 * The delete command wiht the obligatory options
 */
export const deleteCommand = {
  command: 'delete',
  describe: 'deltes a funko pop',
  builder: (yargs: Argv) => {
    return yargs
    .option('user', {
      description: 'username',
      type: 'string',
      demandOption: true
    })
    .option('id', {
      description: 'funko id',
      type: 'number',
      demandoption: true
    })
  },
  handler: (args: ArgumentsCamelCase<deleteFunko>) => {
   checkPath(args.user, () => {
    deleteFunko(args.user, args.id)
   })
  }
}
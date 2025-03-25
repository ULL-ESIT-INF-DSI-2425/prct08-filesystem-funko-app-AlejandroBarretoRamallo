import yargs from 'yargs'
import { hideBin } from 'yargs/helpers';
import { addCommand } from "./addCommand.js";
import { deleteCommand } from './deleteCommand.js';
import { listCommand } from './listCommand.js';
import { modifyCommand } from './modifyCommand.js';
import { showCommand } from './showCommand.js';

/**
 * Checks de diferrent commands
 */
yargs(hideBin(process.argv))
  .command(addCommand.command, addCommand.describe, addCommand.builder, addCommand.handler)
  .command(deleteCommand.command, deleteCommand.describe, deleteCommand.builder, deleteCommand.handler)
  .command(listCommand.command, listCommand.describe, listCommand.builder, listCommand.handler)
  .command(modifyCommand.command, modifyCommand.describe, modifyCommand.builder, modifyCommand.handler)
  .command(showCommand.command, showCommand.describe, showCommand.builder, showCommand.handler)
.help()
.argv
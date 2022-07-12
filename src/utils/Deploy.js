import { config } from 'dotenv';
config()
import { promisify } from 'util';
import g from 'glob';
const glob = promisify(g);

export default async (client) => {
  console.log('[ / Slash Commands ] Atualização dos comandos iniciada...');

  const slashCommands = await glob(`${global.process.cwd()}/src/commands/*/*.js`);

  const arrayOfSlashCommands = [];

  slashCommands.map(async (value) => {
    const file = await import(value);

    if(!file?.name || !file.description ||!file.options) return;

    arrayOfSlashCommands.push(file);
  });

  await client.application.commands.set(arrayOfSlashCommands);

  console.log('[ / Slash Commands ] Atualização dos comandos concluída.');
}
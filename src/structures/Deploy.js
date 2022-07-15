import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

export default async (client) => {
  let arrayOfCommands = Array()
  let map = Array.from(client.commands)
  for (let command of Object(map)) {
    command = command[1].data
    if (command) arrayOfCommands.push(command)
  }

  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)

  try {
    console.log('[ / Slash Commands ] Criação e atualização de comandos iniciada...');

    console.log(`[ / ListCommands ] Comandos encontrados: \n| ${client.commands.map(a => a.name).toString().replaceAll(',', ', ')} |`);
    console.log(`[ / ListCommands ] Quantidade de comandos encontrados: ${arrayOfCommands.length}`);

    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: arrayOfCommands },
    );
    console.log('[ / Slash Commands ] Criação e atualização de comandos concluída!');
  } catch (error) {
    console.error(error);
  }
}

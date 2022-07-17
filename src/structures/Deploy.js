import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

export default async (client) => {
  let arrayOfCommands = Array()
  let map = Array.from(client.commands)
  for (let command of Object(map)) {
    command = command[1].data
    if (command) arrayOfCommands.push(command)
  }

  let arrayOfCommandsDCL = Array()
  let mapDCL = Array.from(client.devcenter)
  for (let commandDCL of Object(mapDCL)) {
    commandDCL = commandDCL[1].data
    if (commandDCL) arrayOfCommandsDCL.push(commandDCL)
  }

  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)

  try {
    console.log('[ / Slash Commands ] Criação e atualização de comandos globais iniciada...');

    console.log(`[ / ListCommands ] Comandos encontrados: \n| ${client.commands.map(a => a.name).toString().replaceAll(',', ', ')} |`);
    console.log(`[ / ListCommands ] Quantidade de comandos encontrados: ${arrayOfCommands.length}`);

    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: arrayOfCommands },
    );
    console.log('[ / Slash Commands ] Criação e atualização de comandos globais concluída!');

    console.log('[ / Slash Commands ] Criação e atualização de comandos Dev. Center iniciada...');

    console.log(`[ / ListCommands ] Comandos encontrados para a Dev. Center: \n| ${client.devcenter.map(a => a.name).toString().replaceAll(',', ', ')} |`);
    console.log(`[ / ListCommands ] Quantidade de comandos encontrados para a Dev. Center: ${arrayOfCommandsDCL.length}`);

    await rest.put(
      Routes.applicationGuildCommands(client.user.id, '724823792794337301'),
      { body: arrayOfCommandsDCL },
    );

    console.log('[ / Slash Commands ] Criação e atualização de comandos Dev. Center concluída!');

  } catch (error) {
    console.error(error);
  }
}

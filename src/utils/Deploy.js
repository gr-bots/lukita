import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

export default async (client) => {
let arrayOfCommands = Array()
let map = Array.from(client.commands)
for (let command of Object(map)) {
  command = command[1].data
  arrayOfCommands.push(command)
}
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)
try {
  console.log('[ / Slash Commands ] Atualização de comandos iniciada...');
  await rest.put(
    Routes.applicationCommands(client.user.id),
    { body: arrayOfCommands },
  );
  console.log('[ / Slash Commands ] Atualização de comandos concluída!');
} catch (error) {
  console.error(error);
}

try {
  await rest.put(
    Routes.applicationGuildCommands(client.user.id, '724823792794337301'),
    { body: arrayOfCommands },
  );
} catch (error) {
  console.error(error);
}
}

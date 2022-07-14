import { REST } from '@discordjs/rest';
import pkg from 'discord.js';
const { Routes } = pkg;

export default async (client) => {
let arrayOfCommands = Array()
let map = Array.from(this.client.commands)
for (let command of Object(map)) {
  command = command[1].data
  arrayOfCommands.push(command)
}
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)
try {
  console.log('Started refreshing application (/) commands.');
  await rest.put(
    Routes.applicationCommands(client.user.id),
    { body: arrayOfCommands },
  );
  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
}
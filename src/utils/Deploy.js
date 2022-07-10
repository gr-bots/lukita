import { config } from 'dotenv';
config()

import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import { readdirSync } from 'fs'

export default (client) => {

const commandsArray = [];
readdirSync('./src/commands').forEach((pasta) => {
  readdirSync(`./src/commands/${pasta}`).filter(file => file.endsWith('.js')).forEach(async (command) => {
    commandsArray.push(command)
  })
})

  const rest = new REST({ version: '9' }).setToken(client.token);

  (async () => {
      try {

          console.log('[Slash Commands] Atualização dos comando iniciada.');

          await rest.put(Routes.applicationCommands(917962601923760139), { body: commandsArray })

         console.log('[Slash Commands] Atualização dos comando concluída.');

      } catch (error) {
          console.error(error);
      }
  })();
}
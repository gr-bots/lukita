import { config } from 'dotenv';
config()

import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import { readdirSync } from 'fs'

export default (client) => {

const commands = [];
readdirSync('./src/commands').forEach((pasta) => {
  readdirSync(`./src/commands/${pasta}`).filter(file => file.endsWith('.js')).forEach(async (command) => {
    commands.push(command)
  })
})
this.client.application.commands.set(commands)

  const rest = new REST({ version: '10' }).setToken(client.token);

  (async () => {
      try {

          console.log('[Slash Commands] Atualização dos comando iniciada.');

          await rest.put(Routes.applicationCommands(client.user.id), { body: commands }).then(cmd => {
            cmd.map(() => {})
          })

         console.log('[Slash Commands] Atualização dos comando concluída.');

      } catch (error) {
          console.error(error);
      }
  })();
}
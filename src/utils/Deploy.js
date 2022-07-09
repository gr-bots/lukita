import { config } from 'dotenv';
config()

import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { readdirSync } from 'fs'

export default (client) => {

  const rest = new REST({ version: '9' }).setToken(client.token);

  (async () => {
      try {

          console.log('[Slash Commands] Atualização dos comandos iniciada.');

          const commands = [];
          readdirSync('./src/commands').forEach((pasta) => {
            readdirSync(`./src/commands/${pasta}`).filter(file => file.endsWith('.js')).forEach(async (command) => {
              commands.push(command)
            })
          })
          this.client.application.commands.set(commands)

         console.log('[Slash Commands] Atualização dos comandos concluída.');

      } catch (error) {
          console.error(error);
      }
  })();
}
import { config } from 'dotenv';
config()

import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import fs from 'fs'
const commands = [];

export default (client) => {

  fs.readdirSync('./src/commands').forEach((pasta) => {
    fs.readdirSync(`./src/commands/${pasta}`).filter(file => file.endsWith('.js')).forEach(async (command) => {
      const cmd = import(`../commands/${pasta}/${command}`),
      const comando = await cmd.default
      commands.push(comando.data.toJSON());
    })
  })
  
  const rest = new REST({ version: '9' }).setToken(client.token);
  
  (async () => {
      try {
        
          console.log('[Slash Commands] Atualização dos comando iniciada.');
  
          await rest.put(Routes.applicationCommands(client.user.id), { body: commands }).then(cmd => {
            cmd.map(() => {
              
            })
          })
  
         console.log('[Slash Commands] Atualização dos comando concluída.');
  
      } catch (error) {
          console.error(error);
      }
  })();

}
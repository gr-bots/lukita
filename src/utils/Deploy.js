require('dotenv').config()

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const commands = [];

module.exports = (client) => {

  fs.readdirSync('./src/commands').forEach((pasta) => {
    fs.readdirSync(`./src/commands/${pasta}`).filter(file => file.endsWith('.js')).forEach((command) => {
      const comando = require(`../commands/${pasta}/${command}`)
      commands.push(comando.data.toJSON());
    })
  })
  
  const rest = new REST({ version: '9' }).setToken(client.token);
  
  (async () => {
      try {
        
          console.log('[Slash Commands] Atualização dos comando iniciada.');
  
          await rest.put(Routes.applicationCommands(client.user.id), { body: commands }).then(cmd => {
            cmd.map(command => {
              
            })
          })
  
         console.log('[Slash Commands] Atualização dos comando concluída.');
  
      } catch (error) {
          console.error(error);
      }
  })();

}
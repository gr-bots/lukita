import { config } from 'dotenv';
config()
import fs from 'fs'

export default async(client) => {
    try {
      console.log('[ / Slash Commands ] Atualização dos comandos iniciada...');
      
      fs.readdirSync('./src/commands').forEach(async (pasta) => {
        const files = await fs.readdirSync(`./src/commands/${pasta}`).filter(file => file.endsWith('.js'))
        files.forEach(async (commands) => {
          const { default: listCommands } = await import(`../../src/commands/${pasta}/${commands}`)
          await client.application.commands.set(listCommands.map(cmd => cmd))
        })
      })
      console.log('[ / Slash Commands ] Atualização dos comandos concluída.');

    } catch (error) {}
}
import { readdirSync } from 'fs'
import { success, getTime } from '../utils/Logger.js'

export default async (client) => {

  console.log(`${success('[ Handler - Events ]')} [${getTime()}] Carregando eventos...`)

  readdirSync(`./src/events/`).forEach(async (file) => {
      let { default: pull } = await import(`../events/${file}`);
      pull = new pull();
    
      client.on(pull.name, pull.run.bind(null, client));
      
    })

  console.log(`${success('[ Handler - Events ]')} [${getTime()}] Eventos carregado!`)

}
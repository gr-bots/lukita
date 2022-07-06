import { readdirSync } from 'fs'
import { success, getTime } from '../utils/Logger.js'

export default async (client) => {

  console.log(`${success('[ Handler - Events ]')} [${getTime()}] Carregando eventos...`)

  readdirSync(`./src/events/`).forEach(async (file) => {
    (async () => {
             const p = await import(`../events/${file}`);
      const pull = await p.default

      if (pull.client) {
        client.on(pull.name, pull.run.bind(null, client));
      }

      if (pull.cluster) {
        client.cluster.on(pull.name, pull.run.bind(null, client));
      }
    })()
    })

  console.log(`${success('[ Handler - Events ]')} [${getTime()}] Eventos carregado!`)

}
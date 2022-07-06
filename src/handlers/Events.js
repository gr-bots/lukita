import { readdirSync } from 'fs'
import { success, info, warning, error, getTime } from '../utils/Logger.js'

export default (client) => {

  console.log(`${success('[ Handler - Events ]')} [${getTime()}] Carregando eventos...`)

  readdirSync(`./src/events/`).forEach(async (dir) => {

    const events = readdirSync(`./src/events/${dir}`).filter((file) => file.endsWith(`.js`))

    for (let file of events) {
      const p = await import(`../events/${dir}/${file}`);
      const pull = await p.default

      if (pull.client) {
        client.on(pull.name, pull.run.bind(null, client));
      }

      if (pull.cluster) {
        client.cluster.on(pull.name, pull.run.bind(null, client));
      }

    }

  })

  console.log(`${success('[ Handler - Events ]')} [${getTime()}] Eventos carregado!`)

}
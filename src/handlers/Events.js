const { readdirSync } = require('fs')
const { success, info, warning, error, getTime } = require('../utils/Logger.js')

module.exports = (client) => {

  console.log(`${success('[ Handler - Events ]')} [${getTime()}] Carregando eventos...`)

  readdirSync(`./src/events/`).forEach((dir) => {

    const events = readdirSync(`./src/events/${dir}`).filter((file) => file.endsWith(`.js`))

    for (let file of events) {
      const pull = require(`../events/${dir}/${file}`);

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
const { readdirSync } = require('fs')
const { success, info, warning, error, getTime } = require('../utils/Logger.js')

module.exports = (client) => {

    console.log(`${success('[ Handler - Modals ]')} [${getTime()}] Carregando modals...`)

    readdirSync(`./src/modals/`).forEach((dir) => {
        const commands = readdirSync(`./src/modals/${dir}`).filter((file) => file.endsWith(`.js`))

        for (let file of commands) {
            let pull = require(`../modals/${dir}/${file}`)

            if (pull.name) {
                client.modals.set(pull.name, pull)
            } else {
                continue;
            }
        }
    })

    console.log(`${success('[ Handler - Modals ]')} [${getTime()}] Modals carregado!`)
}
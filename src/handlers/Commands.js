const { readdirSync } = require('fs')
const { success, info, warning, error, getTime } = require('../utils/Logger.js')

module.exports = (client) => {

    console.log(`${success('[ Handler - Commands ]')} [${getTime()}] Carregando comandos...`)

    readdirSync(`./src/commands/`).forEach((dir) => {
        const commands = readdirSync(`./src/commands/${dir}`).filter((file) => file.endsWith(`.js`))

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`)

            if (pull.name) {
                client.commands.set(pull.name, pull)
            } else {
                continue;
            }
        }
    })

    console.log(`${success('[ Handler - Commands ]')} [${getTime()}] Comandos carregado!`)
}
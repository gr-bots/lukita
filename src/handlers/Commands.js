import { readdirSync } from 'fs'
import { success, info, warning, error, getTime } from '../utils/Logger.js'

export default (client) => {

    console.log(`${success('[ Handler - Commands ]')} [${getTime()}] Carregando comandos...`)

    readdirSync(`./src/commands/`).forEach(async (dir) => {
        const commands = readdirSync(`./src/commands/${dir}`).filter((file) => file.endsWith(`.js`))

        for (let file of commands) {
            const p = import(`../commands/${dir}/${file}`)
            const pull = p.default

            if (pull.name) {
                client.commands.set(pull.name, pull)
            } else {
                continue;
            }
        }
    })

    console.log(`${success('[ Handler - Commands ]')} [${getTime()}] Comandos carregado!`)
}
import { readdirSync } from 'node:fs';
import { success, getTime } from '../utils/Logger.js'

export default async (client) => {

    console.log(`${success('[ Handler - Support Commands ]')} [${getTime()}] Carregando comandos...`)

    readdirSync(`./src/supportCommands/`).forEach(async (dir) => {
        const commands = readdirSync(`./src/supportCommands/${dir}`).filter((file) => file.endsWith('.js'))

        for (let file of commands) {
            const p = await import(`../supportCommands/${dir}/${file}`)
            const pull = await p.default
            client.commands.set(pull.name, pull)
        }
    })
    console.log(`${success('[ Handler - Support Commands ]')} [${getTime()}] Comandos carregado!`)
}
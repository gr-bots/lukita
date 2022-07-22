import { readdirSync } from 'node:fs';
import { success, getTime } from '../utils/Logger.js'

export default async (client) => {

    console.log(`${success('[ Handler - Test Commands ]')} [${getTime()}] Carregando comandos...`)

    readdirSync(`./src/tests/`).forEach(async (dir) => {
        const commands = readdirSync(`./src/tests/${dir}`).filter((file) => file.endsWith('.js'))

        for (let file of commands) {
            const p = await import(`../tests/${dir}/${file}`)
            const pull = await p.default
            client.tests.set(pull.name, pull)
        }
    })
    console.log(`${success('[ Handler - Test Commands ]')} [${getTime()}] Comandos carregado!`)
}
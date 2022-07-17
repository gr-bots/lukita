import { readdirSync } from 'fs'
import { success, getTime } from '../utils/Logger.js'

export default async (client) => {

    console.log(`${success('[ Handler - DCL Commands ]')} [${getTime()}] Carregando comandos...`)

    readdirSync(`./src/devcenter/`).forEach(async (dir) => {
        const commandsDCL = readdirSync(`./src/devcenter/${dir}`).filter((file) => file.endsWith('.js'))

        for (let file of commandsDCL) {
            const p = await import(`../commands/${dir}/${file}`)
            const pull = await p.default
            client.devcenter.set(pull.name, pull)
        }
    })
    console.log(`${success('[ Handler - DCL Commands ]')} [${getTime()}] Comandos carregado!`)
}

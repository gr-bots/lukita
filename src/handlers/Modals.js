import { readdirSync } from 'fs'
import { success, getTime } from '../utils/Logger.js'

export default async (client) => {
    console.log(`${success('[ Handler - Modals ]')} [${getTime()}] Carregando modals...`)

    readdirSync(`./src/modals/`).forEach(async(file) => {
        let { default: pull } = await import(`../modals/${file}`);
        pull = new pull(client)

        client.modals.set(pull.name, pull)
    })

    console.log(`${success('[ Handler - Modals ]')} [${getTime()}] Modal carregado!`)
}

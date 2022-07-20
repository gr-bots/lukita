import { readdirSync } from 'node:fs';
import { success, getTime } from '../utils/Logger.js'

export default async (client) => {
    console.log(`${success('[ Handler - Modals ]')} [${getTime()}] Carregando modals...`)

    readdirSync(`./src/modals/`).forEach(async(file) => {
        let { default: pull } = await import(`../modals/${file}`);

        client.modals.set(pull.name, pull)
    })

    console.log(`${success('[ Handler - Modals ]')} [${getTime()}] Modals carregado!`)
}

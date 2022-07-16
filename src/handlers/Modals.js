import { readdirSync } from 'fs'
import { success, getTime } from '../utils/Logger.js'

export default async (client) => {
    console.log(`${success('[ Handler - Modals ]')} [${getTime()}] Carregando modals...`)

    readdirSync(`./src/modals/`).forEach(async(dir) => {
        const commands = readdirSync(`./src/modals/${dir}`).filter((file) => file.endsWith(`.js`))

        for (let file of commands) {
            let p = await import(`../modals/${dir}/${file}`)
            const pull = await p.default

            if (pull.name) {
                client.modals.set(pull.name, pull)
            } else {
                continue;
            }
        }
    })
    console.log(`${success('[ Handler - Modals ]')} [${getTime()}] Modals carregado!`)
}
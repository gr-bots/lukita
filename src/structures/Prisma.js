import { PrismaClient } from '@prisma/client'
import { bold, getTime, info, success } from '../utils/Logger.js'
const prisma = new PrismaClient()

async function main() {
    await prisma.$connect()
}

export default (client) => {

    main()
        .catch((e) => {
            console.log(bold(`[ ${info('Prisma')} ] ${getTime(new Date())} Ocorreu um erro ao conectar na database`));
            throw e;
        })
        .then(() => {
            client.db = prisma;
            console.log(success(`[ ${info('Prisma')} ] ${getTime(new Date())} Conectado na database`));
        });

}
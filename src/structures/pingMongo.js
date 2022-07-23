import { Database } from './Database.js';

export default class MongoDB extends Database {
    constructor(client) {
        this.ping = async function ping() {
            const pingStart = process.hrtime();
            await client.db.guild.findOne({ _id: interaction.guild.id });
            const pingStop = process.hrtime(pingStart);
            const pingDb = Math.round(((pingStop[0] * 1e9) + pingStop[1]) / 1e6);
            return pingDb;
        }
    }
}
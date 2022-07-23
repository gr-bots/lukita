import { User, Guild } from '../utils/Schemas.js';

export default () => {
    class Database {
        constructor() {
            this.user = User,
            this.guild = Guild
        }
    }
    client.db.ping = async function ping() {
        const pingStart = process.hrtime();
        await client.db.guild.findOne({ _id: interaction.guild.id });
        const pingStop = process.hrtime(pingStart);
        const pingDb = Math.round(((pingStop[0] * 1e9) + pingStop[1]) / 1e6);
        return pingDb;
    };
    client.db = new Database();
}
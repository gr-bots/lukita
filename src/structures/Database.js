import { User, Guild } from '../utils/Schemas.js';

class Database {
    constructor() {
        this.user = User,
        this.guild = Guild
    }
}
const db = new Database();

export default (client) => {
    client.db = db;
}
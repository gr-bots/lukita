import { User, Guild } from '../utils/Schemas.js';

class Database {
    constructor() {
        this.user = User,
        this.guild = Guild
    }
}

export default (client) => {
    client.db = new Database();
  }
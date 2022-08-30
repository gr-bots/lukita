import { User, Guild } from '../utils/Schemas.js';

export default (client) => {
  class Database {
    constructor() {
      this.user = User,
      this.guild = Guild;
    }
  }
  client.db = new Database();
}

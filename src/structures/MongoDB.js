import { User, Guild } from '../utils/Models.js';

export default (client) => {
  class Database {
    constructor() {
      this.user = User,
      this.guild = Guild;
    }
    
    async ping() {
      const pingStart = process.hrtime();
      await this.guild?.findOne({ _id: client.user.id });
      const pingStop = process.hrtime(pingStart);
  
      return Math.round(((pingStop[0] * 1e9) + pingStop[1]) / 1e6);
    }
  }
  client.db = new Database();
}

import { User, Guild } from '../utils/Schemas.js';

export default (client) => {
    class MongoDB {
        constructor() {
            this.user = User,
            this.guild = Guild
        }
    }
    client.db = new MongoDB();
}
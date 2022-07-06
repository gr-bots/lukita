import { db as Database } from './Config.js';
import { Create } from 'aoi.fb';
const db = Create(Database)

export default (client) => {
    client.db = db
}
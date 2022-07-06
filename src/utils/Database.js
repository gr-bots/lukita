import { db as Database } from './Config.js';
import pkg from 'aoi.fb'
const { Create } = pkg
const db = Create(Database)

export default (client) => {
    client.db = db
}
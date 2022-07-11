import { aoifb as Database } from './Config.js';
import pkg from 'aoi.fb'
const { Create } = pkg
const aoifb = Create(Database)

export default (client) => {
    client.fb = aoifb
}
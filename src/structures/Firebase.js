import { aoifb as Firebase } from '../utils/Config.js';
import pkg from 'aoi.fb'
const { Create } = pkg
const aoifb = Create(Firebase)

export default (client) => {
  client.db = aoifb
}
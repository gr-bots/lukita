import { aoifb as Firebase } from '../utils/config.js';
import pkg from 'aoi.fb'
const { Create } = pkg
const aoifb = Create(Firebase)

export default (client) => {
    client.fb = aoifb
}
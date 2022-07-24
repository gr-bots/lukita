import { fbConfig as Firebase } from '../utils/Config.js';
import fb from 'firebase'
fb.initializeApp(fbConfig)

export default (client) => {
  client.fb = fb.database();
}

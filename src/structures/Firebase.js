import { fbConfig as Firebase } from '../utils/Config.js';
import fb from 'firebase'

export default (client) => {
  fb.initializeApp(fbConfig)
  client.fb = fb.database();
}

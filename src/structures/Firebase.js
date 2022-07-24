import { fbConfig as Firebase } from '../utils/Config.js';
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

export default (client) => {
  const app = initializeApp(fbConfig)
  client.fb = getDatabase(app);
}

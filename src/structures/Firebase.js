import { fbConfig } from '../utils/Config.js';
import { initializeApp } from 'firebase/app'
import { getDatabase, re, set, onValue } from 'firebase/database'

export default (client) => {
  const app = initializeApp(fbConfig)
  client.fb = getDatabase(app);
}
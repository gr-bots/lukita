import { fbConfig } from '../utils/Config.js';
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, onValue } from 'firebase/database'

export default (client) => {
  const app = initializeApp(fbConfig)
  const db = getDatabase(app);
  class Firebase {
    constructor (args) {
      this.ref = ref(args)
      this.set = set(args)
    }
  }
  client.fb = new Firebase()
}
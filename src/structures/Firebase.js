import { fbConfig } from '../utils/Config.js';
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, onValue } from 'firebase/database'

export default (client) => {
  const app = initializeApp(fbConfig)
  db = getDatabase(app);
  class Firebase {
    constructor() {
      this.ref = ref(db);
      this.onValue = onValue(this.ref);
    }
    async set(path, value) {
      return set(this.ref, path, value);
    }
  }
  client.fb = new Firebase();
}
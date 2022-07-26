import { fbConfig } from '../utils/Config.js';
import pkg from 'firebase-util.js';
const { Firebase: FirebaseUtil } = pkg;
const db = new FirebaseUtil(fbConfig);

export default (client) => {
  client.fb = db
}
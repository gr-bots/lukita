import { fbConfig } from '../utils/Config.js';
import { FirebaseUtil } from 'firebase-util.js';
const db = new FirebaseUtil(fbConfig);

export default (client) => {
  client.fb = db
}
import { fbConfig } from '../utils/Config.js';
import pkg from 'firebase-util.js';
const { FirebaseUtil } = pkg;
const db = FirebaseUtil(fbConfig);

export default (client) => {
  client.fb = db
}
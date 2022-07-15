import { config } from 'dotenv';
config()
import LukitaClient from './src/structures/Client.js';
const client = new LukitaClient();
client.init()
import Modals from 'discord-modals'
Modals(client)
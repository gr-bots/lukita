import LukitaClient from './src/utils/Client.js';
const client = new LukitaCLient();

require('discord-modals')(client)
require('./src/init.js')(client)
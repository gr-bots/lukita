import Lukita from './src/utils/Client.js';
const client = new Lukita();

require('discord-modals')(client)
require('./src/init.js')(client)
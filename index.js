const client = require('./src/utils/Client')

client.on('ready', async(client) => {
    require('./src/handlers/Commands.js')(client)
    require('./src/handlers/Events.js')(client)
    require('./src/handlers/Modals.js')(client)
    require('./src/utils/Deploy.js')(client)
    require('./src/utils/Database.js')(client)
    require('./src/utils/Functions.js')(client);
})


require('discord-modals')(client)
require('./src/init.js')(client)
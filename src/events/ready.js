import Event from '../../structures/Event'

export default class extends Event {
  constructor(client) {
   super(client, {
     name: 'ready'
   })
}
    run = async () => {
      require('./src/handlers/Commands.js')(client)
      require('./src/handlers/Events.js')(client)
      require('./src/handlers/Modals.js')(client)
      require('./src/utils/Deploy.js')(client)
      require('./src/utils/Database.js')(client)
      require('./src/utils/Functions.js')(client);
      
      function setStatus() {

          client.user.setPresence({activities: [{name: `💙› Users \{${client.status.users}\}・Guilds \{${client.status.guilds}\} `, type: "WATCHING"}], status: "idle"})
    
      }

      function setOtherStatus() {
    
          client.user.setPresence({activities: [{name: `🎈› Ping \{${Math.round(client.ws.ping)}ms\}`, type: "PLAYING"}], status: "idle"})
    
      }
      setStatus()
      setOtherStatus()
      setInterval(() => { setStatus(), setOtherStatus() }, 3000)
    }
}
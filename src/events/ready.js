import Event from '../structures/Event.js'

export default class extends Event {
  constructor(client) {
   super(client, {
     name: 'ready'
   })
}
    run = async () => {
      console.log('test')
      
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
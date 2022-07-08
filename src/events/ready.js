import Event from '../structures/Event.js'

export default class extends Event {
  constructor(client) {
   super(client, {
     name: 'ready'
   })
}
  async run () {
      const setStatus = () => {

          this.client.user.setPresence({activities: [{name: `💙› Users \{${this.client.status.users}\}・Guilds \{${this.client.status.guilds}\} `, type: "WATCHING"}], status: "idle"})
    
      }

      const setOtherStatus = () => {
    
          this.client.user.setPresence({activities: [{name: `🎈› Ping \{${Math.round(this.client.ws.ping)}ms\}`, type: "PLAYING"}], status: "idle"})
    
      }
      setStatus()
      setOtherStatus()
      setInterval(() => { setStatus(), setOtherStatus() }, 3000)

    }
}
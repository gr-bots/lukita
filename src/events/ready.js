import Event from '../structures/Event.js'
import { readdirSync } from 'fs'

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

      const commands = [];
      readdirSync('./src/commands').forEach((pasta) => {
        readdirSync(`./src/commands/${pasta}`).filter(file => file.endsWith('.js')).forEach(async (command) => {
          commands.push(command)
        })
      })
this.client.application.commands.set(commands)

    }
}
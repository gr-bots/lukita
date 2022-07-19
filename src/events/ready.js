import Event from '../structures/Event.js'
import { readdirSync } from 'fs'

export default class extends Event {
  constructor(client) {
   super(client, {
     name: 'ready'
   })
}
  async run () {
    this.client.manager?.init(client.user.id);

    this.client.user.setPresence({activities: [{name: `💙› Use \{/help\} `, type: "PLAYING"}], status: "idle"})
  }
}
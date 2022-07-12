import Event from '../structures/Event.js'

export default class extends Event {
  constructor(client) {
   super(client, {
     name: 'raw'
   })
}
  
  async run (data) {
    this.client.manager?.updateVoiceState(data);
  }
}
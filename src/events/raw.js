import Event from '../structures/Event.js'

export default class extends Event {
  constructor(client) {
   super(client, {
     name: 'raw'
   })
}
  async run (packet) {
    client.vulkava.handleVoiceUpdate(packet);
  }
}
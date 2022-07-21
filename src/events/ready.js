import Event from '../structures/Event.js'

export default class extends Event {
  constructor(client) {
    super(client, {
      name: 'ready'
    })
  }
  async run() {
    this.client.manager?.init(client.user.id);

    this.client.user.setPresence({ activities: [{ name: '💙› Use {/help}' }], status: 'idle' });
  }
}

import Event from '../structures/Event.js';

export default class extends Event {
  constructor(client) {
   super(client, {
     name: 'guildCreate'
   })
}

async run (interaction) {
    this.client.fb.set('guilds', `${interaction.guild.id}/actives/forms`, false)
    this.client.fb.set('guilds', `${interaction.guild.id}/actives/logs`, false)
    this.client.fb.set('guilds', `${interaction.guild.id}/actives/modlogs`, false)
    this.client.fb.set('guilds', `${interaction.guild.id}/actives/welcome`, false)

    this.client.channels.cache.get("998201539929845760").send({content: `Nova guild: ${interaction.guild.name} - ${interaction.guild.id}`})
}
}
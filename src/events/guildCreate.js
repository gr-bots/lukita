import Event from '../structures/Event.js';

export default class extends Event {
  constructor(client) {
   super(client, {
     name: 'guildCreate'
   })
}

async run (guild) {
    let Guild = await this.db.guild.findOne({ _id: guild.id });
    if(!Guild) await this.db.guild.create({ _id: guild.id });

    this.client.channels.cache.get("998201539929845760").send({content: `Nova guild: ${guild.name} - ${guild.id}`})
  }
}
import { Event } from '../structures/Event.js';

export default class GuildCreate extends Event {
  constructor() {
    super();
    this.eventName = 'guildCreate';
  }

  async execute(client, guild) {
    const Guild = await client.db.guild.findOne({ _id: guild.id });
    if (!Guild) await client.db.guild.create({ _id: guild.id });

    client.channels.cache.get('1020491024021336214').send({ content: `Nova guild: ${guild.name} - ${guild.id}` });
  }
}

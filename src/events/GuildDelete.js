import { Event } from '../structures/Event.js';

export default class GuildDelete extends Event {
  constructor() {
    super();
    this.eventName = 'guildDelete';
  }

  async execute(client, guild) {
    const Guild = await client.db.guild.findOne({ _id: guild.id });
    if (Guild) await client.db.guild.delete({ _id: guild.id });

    client.channels.cache.get('1020491024021336214').send({ content: `Me removeram de: ${guild.name} - ${guild.id}` });
  }
}

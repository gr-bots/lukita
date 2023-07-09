import { Event } from '../structures/Event.js';

export default class GuildDelete extends Event {
  constructor() {
    super();
    this.eventName = 'guildDelete';
  }

  async execute(client, guild) {
    const Guild = await client.db.guild.findOne({ _id: guild.id });
    if (!Guild) await client.db.guild.deleteOne({ _id: guild.id });

    if(Guild.bl) guild.leave();

    client.channels.cache.get('1095125234388041748').send({ content: `Fui retirado de uma guild: ${guild.name} - ${guild.id}` });
  }
}

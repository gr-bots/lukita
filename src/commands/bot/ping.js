import { ApplicationCommandType } from 'discord.js';
import { Command } from '../../structures/Command.js';
import { emjs } from './utils/Config.js';

async function pingMongo(client, interaction) {
  const pingStart = process.hrtime();
  await client.db.guild.findOne({ _id: interaction.guild.id });
  const pingStop = process.hrtime(pingStart);
  const pingDb = Math.round(((pingStop[0] * 1e9) + pingStop[1]) / 1e6);
  return pingDb;
}

export default class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      description: '「💙 Bot」・Veja minha latência atual',
      type: ApplicationCommandType.ChatInput,
      devOnly: false,
    });
  }

  async execute({ interaction }) {
    const bahzin = await interaction.reply({ content: `${emjs.loading}`, fetchReply: true });
    const wsPing = Math.round(this.client.ws.ping);

    let pingContent = `> :satellite: Gateaway \`${wsPing}ms\`\n> :zap: API \`${bahzin.createdTimestamp - interaction.createdTimestamp}ms\`\n> ${emjs.mongodb} Database \`${await pingMongo(this.client, interaction)}ms\``;

    setTimeout(() => { interaction.editReply({ content: `${pingContent}` }); }, 1000);
  }
}

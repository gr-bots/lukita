import { ApplicationCommandType } from 'discord.js';
import { Command } from '../../structures/Command.js';
import { emjs } from '../../utils/Emojis.js';

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

    await setTimeout(() => { interaction.editReply({ content: `> :satellite: Gateaway \`${wsPing}ms\`\n> :zap: API \`${bahzin.createdTimestamp - interaction.createdTimestamp}ms\`\n> ${emjs.mongodb} Database \`${this.client.db.ping()}ms\`` }); }, 1000);
  }
}
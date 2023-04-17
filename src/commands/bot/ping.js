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

    if (await client.db.user.findOne({_id: user.id}).then(x => x.bl) == true) {
      await interaction.reply({ content: `> ⚠️・<@${user.id}>, Err... Parece que têm têm alguém na Blacklist..\n> Você está bloqueado de usar meus comandos.`, ephemeral: true, fetchReply: true });
    } else {
      let pingContent = `> :satellite: Gateaway \`${wsPing}ms\`\n> :zap: API \`${bahzin.createdTimestamp - interaction.createdTimestamp}ms\`\n> ${emjs.mongodb} Database \`${await this.client.db.ping()}ms\``;
  
      setTimeout(() => { interaction.editReply({ content: `${pingContent}` }); }, 1000);
    }
  }
}

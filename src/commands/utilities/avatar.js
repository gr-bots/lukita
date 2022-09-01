import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { Command } from '../../structures/Command.js';
import { emjs } from '../../utils/Emojis.js';

export default class AvatarCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      description: '「🔧 Utilities」・Veja o avatar seu ou de outro usuário',
      type: ApplicationCommandType.ChatInput,
      options: [{ 
        name: 'usuário',
        description: '「🌆 Avatar」・Informe o usuário',
        type: ApplicationCommandOptionType.User
      }],
      devOnly: false,
    });
  }

  async execute({ interaction }) {
    const user = await interaction.options.getUser('usuário') || interaction.user;
    if (!interaction.member.avatar || !interaction.guild.members.cache.get(user.id).avatar) {
      interaction.reply({content: 'bah'})
    } else {
      const embedAvatar = new EmbedBuilder()
        .setTitle(`Avatar de ${user.tag}`)
        .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }));

      interaction.reply({ embeds: [embedAvatar], fetchReply: true });
    }
  }
}

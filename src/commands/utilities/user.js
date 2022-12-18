import { ActionRowBuilder, ApplicationCommandType, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { Command } from '../../structures/Command.js';
import { Tools } from '../../utils/Functions.js'

export default class UserCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'user',
      description: '「🎈 Utilities」・Sub categoria para o usuário',
      type: ApplicationCommandType.ChatInput,
      options: [{
        name: 'info',
        description: '「🔧 Utilities」・Veja suas informações ou de outro usuário',
        type: ApplicationCommandOptionType.SubCommand,
        options: [{
          name: 'usuário',
          description: '「🌆 Id」・Informe o usuário',
          type: ApplicationCommandOptionType.User
        }]
      },{
        name: 'avatar',
        description: '「🔧 Utilities」・Veja o avatar seu ou de outro usuário',
        type: ApplicationCommandOptionType.SubCommand,
        options: [{ 
          name: 'usuário',
          description: '「🌆 User」・Informe o usuário',
          type: ApplicationCommandOptionType.User
        }],
      }],
      devOnly: false,
    });
  }

  async execute({ interaction }) {
    const { client, guild, member, channel } = interaction
    const tools = new Tools(client, interaction)

    if (interaction.options.getSubcommand() === 'info') {
      interaction.reply({content: '> Em desenvolvimento...', ephemeral: true})
    }

    if (interaction.options.getSubcommand() === 'avatar') {
      let user = await interaction.options.getUser('usuário') || interaction.user;

      interaction.reply({ embeds: [
        new EmbedBuilder()
        .setTitle(`:camera: ${user.tag}`)
        .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setColor(`${tools.randomHex()}`)
        .setFooter({ text: 'Bonito ou não é um avatar..' })
      ], components: [
        new ActionRowBuilder()
		    .addComponents(new ButtonBuilder().setLabel('Abra o avatar na web').setStyle(ButtonStyle.Link).setURL(user.displayAvatarURL({ dynamic: true, size: 2048 })))
      ] });
    }
  }
}

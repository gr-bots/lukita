import { ActionRowBuilder, ApplicationCommandType, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, EmbedBuilder, codeBlock, inlineCode } from 'discord.js';
import { Command } from '../../structures/Command.js';
import { Tools } from '../../utils/Functions.js'

export default class ServerinfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'serverinfo',
      description: '「🔧 Utilities」・Saiba as informações deste ou de outro servidor',
      type: ApplicationCommandType.ChatInput,
      options: [{ 
        name: 'id',
        description: '「🤔 Servidor」・Informe o servidor',
        type: ApplicationCommandOptionType.String
      }],
      devOnly: false,
    });
  }

  async execute({ interaction }) {
    const { client, guild, member, channel } = interaction
    const tools = new Tools(client, interaction)

    let server = await interaction.options.getString('id')
    
    if (server === null) {
      interaction.reply({ embeds: [
        new EmbedBuilder()
        .setThumbnail(guild.iconURL({ dynamic: true, size: 2048 }))
        .setAuthor({ name: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true, size: 2048 }) })
        .setDescription(`${codeBlock(guild.description)}\n**Principais**\n• Dono: <@${guild.ownerId}> | ${inlineCode(await client.users.fetch(guild.ownerId).then(x => x.tag))}\n• Id: ${inlineCode(guild.id)}\n• Região: **${guild.preferredLocale.replace('da', 'Dansk').replace('de', 'Alemanha').replace('en-GB', 'Inglaterra').replace('en-US', 'Estados Unidos').replace('es-ES', 'Espanha').replace('fr', 'França').replace('hr', 'Croácia').replace('pt-BR', 'Brasil')}**`)
        .setColor(`${tools.randomHex()}`)
      ] });
    } else {
      let optionGuild = await client.guilds.cache.get(server)
      interaction.reply({ embeds: [
        new EmbedBuilder()
        .setThumbnail(optionGuild.iconURL({ dynamic: true, size: 2048 }))
        .setAuthor({ name: `${optionGuild.name}`, iconURL: optionGuild.iconURL({ dynamic: true, size: 2048 }) })
        .setDescription(`${codeBlock(optionGuild.description)}\n**Principais**\n• Dono: <@${optionGuild.ownerId}> | ${inlineCode(await client.users.fetch(optionGuild.ownerId).then(x => x.tag))}\n• Id: ${inlineCode(optionGuild.id)}\n• Região: **${optionGuild.preferredLocale.replace('da', 'Dansk').replace('de', 'Alemanha').replace('en-GB', 'Inglaterra').replace('en-US', 'Estados Unidos').replace('es-ES', 'Espanha').replace('fr', 'França').replace('hr', 'Croácia').replace('pt-BR', 'Brasil')}**`)
        .setColor(`${tools.randomHex()}`)
      ] });
    }
  }
}

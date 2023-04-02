import pkg from 'discord.js';
const { ActionRowBuilder, ApplicationCommandType, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, EmbedBuilder, codeBlock, inlineCode } = pkg;
import { Command } from '../../structures/Command.js';
import { emjs } from '../../utils/Emojis.js';
import { Tools } from '../../utils/Functions.js'

export default class ServerCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'server',
      description: '「📘 Utilities」・Sub categoria para o servidor',
      type: ApplicationCommandType.ChatInput,
      options: [{
        name: 'info',
        description: '「🔧 Utilities」・Saiba as informações deste ou de outro servidor',
        type: ApplicationCommandOptionType.Subcommand,
        options: [{ 
          name: 'id',
          description: '「🤔 Servidor」・Informe o servidor',
          type: ApplicationCommandOptionType.String
        }]
      }, {
        name: 'icon',
        description: '「🔧 Utilities」・Veja o ícone deste ou de outro servidor',
        type: ApplicationCommandOptionType.Subcommand,
        options: [{ 
          name: 'id',
          description: '「🤔 Servidor」・Informe o servidor',
          type: ApplicationCommandOptionType.String
        }]
      }],
      devOnly: false,
    });
  }

  async execute({ interaction }) {
    const { client, guild, member, channel } = interaction
    const tools = new Tools(client, interaction)

    if (interaction.options.getSubcommand() === 'info') {
      let server = await interaction.options.getString('id')
      let joinedInServer = await guild.members.fetch('917962601923760139').then(x => x.joinedTimestamp)
      
      try {
        if (server === null) {
          let txtGuild = await guild.channels.fetch().then(x => x.filter(z => z?.type === 0).size)
          let vcGuild = await guild.channels.fetch().then(x => x.filter(z => z?.type === 2).size)
          let anGuild = await guild.channels.fetch().then(x => x.filter(z => z?.type === 5).size)
          let foGuild = await guild.channels.fetch().then(x => x.filter(z => z === null).size)
          let stGuild = await guild.channels.fetch().then(x => x.filter(z => z?.type === 13).size)
          let categGuild = await guild.channels.fetch().then(x => x.filter(z => z?.type === 4).size)

          interaction.reply({ embeds: [
            new EmbedBuilder()
            .setThumbnail(guild.iconURL({ dynamic: true, size: 2048 }))
            .setAuthor({ name: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true, size: 2048 }) })
            .setDescription(`${codeBlock(guild.description || '  ')}\n**Principais**\n• Dono: <@${guild.ownerId}> | ${inlineCode(await client.users.fetch(guild.ownerId).then(x => x.tag))}\n• Id: ${inlineCode(guild.id)}\nRegião: **${guild.preferredLocale.replace('da', 'Dansk').replace('de', 'Alemanha').replace('en-GB', 'Inglaterra').replace('en-US', 'Estados Unidos').replace('es-ES', 'Espanha').replace('fr', 'França').replace('hr', 'Croácia').replace('pt-BR', 'Brasil')}**`)
            .addFields({
                name: 'Canais',
                value: `${emjs.chText}・Texto: ${inlineCode(txtGuild)}\n${emjs.chVoice}・Voz: ${inlineCode(vcGuild)}\n${emjs.chAnnouncement}・Anúncio: ${inlineCode(anGuild)}\n${emjs.chForum}・Fórum: ${inlineCode(foGuild)}\n${emjs.chStage}・Estágio: ${inlineCode(stGuild)}\n\n**・Categorias:** ${inlineCode(categGuild)}`,
                inline: true
              }, {
                name: 'Membros', 
                value: `• Total: ${inlineCode(await guild.members.fetch().then(x => x.size))}\n• Humanos: ${inlineCode(await guild.members.fetch().then(x => x.filter(y => !y.user.bot).size))}\n• Bots: ${inlineCode(await guild.members.fetch().then(x => x.filter(y => y.user.bot).size))}`, 
                inline: true
              }, {
                name: '<a:nitro:1054055122134634557> • Server Boosters',
                value: `• Nível Impulsos: ${inlineCode(guild.premiumTier)}\n• Quantidade de Boosts: ${inlineCode(guild.premiumSubscriptionCount)}`,
                inline: false
              }, {
                name: '📆 • Criado em',
                value: `<t:${parseInt(guild.createdTimestamp / 1000)}:f> (<t:${parseInt(guild.createdTimestamp / 1000)}:R>)`,
                inline: false
              }, {
                name: '📆 • Entrei em',
                value: `<t:${parseInt(joinedInServer / 1000)}:f> (<t:${parseInt(joinedInServer / 1000)}:R>)`,
                inline: true
              })
            .setColor(`${tools.randomHex()}`)
          ] });
        } else {
          let optionGuild = await client.guilds.cache.get(server)
          let joinedInOPServer = await optionGuild.members.fetch('917962601923760139').then(x => x.joinedTimestamp)

          let txtOpGuild = await optionGuild.channels.fetch().then(x => x.filter(z => z?.type === 0).size)
          let vcOpGuild = await optionGuild.channels.fetch().then(x => x.filter(z => z?.type === 2).size)
          let anOpGuild = await optionGuild.channels.fetch().then(x => x.filter(z => z?.type === 5).size)
          let foOpGuild = await optionGuild.channels.fetch().then(x => x.filter(z => z === null).size)
          let stOpGuild = await optionGuild.channels.fetch().then(x => x.filter(z => z?.type === 13).size)
          let categOpGuild = await guild.channels.fetch().then(x => x.filter(z => z?.type === 4).size)

          interaction.reply({ embeds: [
            new EmbedBuilder()
            .setThumbnail(optionGuild.iconURL({ dynamic: true, size: 2048 }))
            .setAuthor({ name: `${optionGuild.name}`, iconURL: optionGuild.iconURL({ dynamic: true, size: 2048 }) })
            .setDescription(`${codeBlock(optionGuild.description || '  ')}\n**Principais**\n• Dono: <@${optionGuild.ownerId}> | ${inlineCode(await client.users.fetch(optionGuild.ownerId).then(x => x.tag))}\n• Id: ${inlineCode(optionGuild.id)}\n• Região: **${optionGuild.preferredLocale.replace('da', 'Dansk').replace('de', 'Alemanha').replace('en-GB', 'Inglaterra').replace('en-US', 'Estados Unidos').replace('es-ES', 'Espanha').replace('fr', 'França').replace('hr', 'Croácia').replace('pt-BR', 'Brasil')}**`)
            .addFields({
                name: 'Canais',
                value: `${emjs.chText}・Texto: ${inlineCode(txtOpGuild)}\n${emjs.chVoice}・Voz: ${inlineCode(vcOpGuild)}\n${emjs.chAnnouncement}・Anúncio: ${inlineCode(anOpGuild)}\n${emjs.chForum}・Fórum: ${inlineCode(foOpGuild)}\n${emjs.chStage}・Estágio: ${inlineCode(stOpGuild)}\n\n**・Categorias:** ${inlineCode(categOpGuild)}`,
                inline: true
              }, {
                name: 'Membros', 
                value: `• Total: ${inlineCode(await optionGuild.members.fetch().then(x => x.size))}\n• Humanos: ${inlineCode(await optionGuild.members.fetch().then(x => x.filter(y => !y.user.bot).size))}\n• Bots: ${inlineCode(await optionGuild.members.fetch().then(x => x.filter(y => y.user.bot).size))}`, 
                inline: true
              }, {
                name: '<a:nitro:1054055122134634557> • Server Boosters',
                value: `• Nível Impulsos: ${inlineCode(optionGuild.premiumTier)}\n• Quantidade de Boosts: ${inlineCode(optionGuild.premiumSubscriptionCount)}`,
                inline: false
              }, {
                name: '📆 • Criado em',
                value: `<t:${parseInt(optionGuild.createdTimestamp / 1000)}:f> (<t:${parseInt(optionGuild.createdTimestamp / 1000)}:R>)`,
                inline: false
              }, {
                name: '📆 • Entrei em',
                value: `<t:${parseInt(joinedInOPServer / 1000)}:f> (<t:${parseInt(joinedInOPServer / 1000)}:R>)`,
                inline: true
              })
            .setColor(`${tools.randomHex()}`)
          ] });
        }
      } catch (error) {
        console.log(`・Erro no Serverinfo: ${error.stack}`)
        return interaction.reply({ content: `> ⚠️・<@${interaction.user.id}>, Ocorreu um erro ao executar o comando! Já avisei meu desenvolvedor.`, ephemeral: true, fetchReply: true });
      }
    }
    if (interaction.options.getSubcommand() === 'icon') {
      let server = await interaction.options.getString('id')
      
      try {
        if (server === null) {
          interaction.reply({ embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `📸 ${guild.name}`, iconURL: guild.iconURL({ dynamic: true, size: 2048 }) })
            .setImage(guild.iconURL({ dynamic: true, size: 2048 }))
            .setColor(`${tools.randomHex()}`)
          ], components: [
            new ActionRowBuilder()
            .addComponents(new ButtonBuilder().setLabel('Abra o ícone na web').setStyle(ButtonStyle.Link).setURL(guild.iconURL({ dynamic: true, size: 2048 })))
          ] });
        } else {
          let optionGuild = await client.guilds.cache.get(server)
          interaction.reply({ embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `📸 ${optionGuild.name}`, iconURL: optionGuild.iconURL({ dynamic: true, size: 2048 }) })
            .setImage(optionGuild.iconURL({ dynamic: true, size: 2048 }))
            .setColor(`${tools.randomHex()}`)
          ], components: [
            new ActionRowBuilder()
            .addComponents(new ButtonBuilder().setLabel('Abra o ícone na web').setStyle(ButtonStyle.Link).setURL(optionGuild.iconURL({ dynamic: true, size: 2048 })))
          ] });
        }
      } catch (error) {
        console.log(`・Erro no Servericon: ${error.stack}`)
        return interaction.reply({ content: `> ⚠️・<@${interaction.user.id}>, Ocorreu um erro ao executar o comando! Já avisei meu desenvolvedor.`, ephemeral: true, fetchReply: true });
      }
    }

  }
}
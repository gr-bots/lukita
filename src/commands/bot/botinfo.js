import { SlashCommandBuilder, inlineCode } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

export default {
    name: "botinfo",
    category: 'Bot',
    view: true,
    devsOnly: false,
    data: new SlashCommandBuilder().setName("botinfo").setDescription("「💙 Bot」・Saiba mais sobre mim e minhas informações detalhadas"),
    run: async (client, interaction) => {
        let botAvatar = client.user.displayAvatarURL({ format: 'png', size: 4096 })
        let embedBotinfo = new MessageEmbed()
          .setThumbnail(botAvatar)
          .setTitle(`${client.emotes.nothing}${client.emotes.nothing} ・Minhas informações principais・ ${client.emotes.nothing}${client.emotes.nothing}`)
          .setDescription(`${client.emotes.hello} __Olá__, __sou__ ${client.user.tag}, __seu bot de moderação para o Discord__, completo e simples para seu servidor.\n> Como pode ver, sou feito em ${client.emotes.slash} SlashCommands`)
          .addFields({
            name: `━・Dados「${client.emotes.analytics}」`,
            value: `> › Usuários: ${inlineCode(client.status.users)}\n> › Servidores: ${inlineCode(client.status.guilds)}\n> › Comandos: ${inlineCode(client.commands.size - 1)}\n> › Uptime: ${inlineCode(client.tools.uptime())}`,
            inline: true
          }, {
            name: `━・Criadores「${client.emotes.dev}」`,
            value: `> › ${inlineCode(await client.users.fetch(client.developers[0]).then(a => a.tag))}\n> › ${inlineCode(await client.users.fetch(client.developers[1]).then(a => a.tag))}\n> › ${inlineCode(await client.users.fetch(client.developers[2]).then(a => a.tag))}`,
            inline: true
          }, {
            name: `━・Adicionais「${client.emotes.info}」`,
            value: `> › Sou desenvolvido em ${client.emotes.djs} Discord.js\n> › Fui criado <t:${parseInt(client.user.createdTimestamp / 1000)}:R>\n> › Em breve com servidor de suporte.`,
            inline: false
          })
          .setFooter({
            text: `Solicitado por ${interaction.member.user.tag}`,
            iconURL: `${interaction.member.user.displayAvatarURL({display: true, size: 4096})}`
          })
          .setColor(`${client.pallete.primary}`)
          .setTimestamp()
        
        interaction.reply({
          embeds: [embedBotinfo],
        })
    }
}
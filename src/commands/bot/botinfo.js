import { inlineCode } from '@discordjs/builders';
import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';

export default {
    name: "botinfo",
    description: "Saiba mais sobre mim e minhas informações detalhadas",
    category: 'Bot',
    view: true,
    devsOnly: false,
    run: async (client, interaction) => {
     const botAvatar = client.user.displayAvatarURL({ format: 'png', size: 4096 })

     const  rowBotinfo = new MessageActionRow()
			.addComponents(
				new MessageButton()
          .setLabel('Me adicione em seu servidor')
					.setStyle('LINK')
          .setURL('https://discord.com/oauth2/authorize?client_id=917962601923760139&scope=bot+identify+guilds+email+applications.commands&permissions=2080374975')
			);

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
          value: `> › ${inlineCode(await client.users.fetch(client.developers[0]).then(a => a.tag))}\n> › ${inlineCode(await client.users.fetch(client.developers[1]).then(a => a.tag))}\n> › ${inlineCode(await client.users.fetch(client.developers[2]).then(a => a.tag))}\n> › ${inlineCode(await client.users.fetch(client.developers[3]).then(a => a.tag))}`,
          inline: true
        }, {
          name: `━・Adicionais「${client.emotes.info}」`,
          value: `> › Sou desenvolvido em ${client.emotes.djs} Discord.js\n> › Fui criado <t:${parseInt(client.user.createdTimestamp / 1000)}:R>\n> › [Meu servidor de suporte e comunidade](https://discord.gg/pJyY3zsMmB)\n > ›  Entre em meu Mundo através do link acima e saiba mais...`,
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
          components: [rowBotinfo],
        })
  }
}
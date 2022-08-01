import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, inlineCode } from 'discord.js';

export default {
    name: "botinfo",
    data: {
      name: "botinfo",
      type: 1,
      description: "「💙 Bot」・Saiba mais sobre mim e minhas informações detalhadas",
      options: []
    },
    category: 'Bot',
    view: true,
    devsOnly: false,
    run: async (client, interaction) => {
     let version = "v" + await import(`${process.cwd()}/package.json`, { assert: {type: "json"}}).then(x => x.default.version)
     let ram = Math.round(process.memoryUsage().rss / 1024 / 1024) + "MB"

     const rowBotinfo = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
          .setLabel('Me adicione')
					.setStyle(ButtonStyle.Link)
          .setURL('https://discord.com/oauth2/authorize?client_id=917962601923760139&scope=bot+identify+guilds+email+applications.commands&permissions=2080374975')
			)
      .addComponents(
				new ButtonBuilder()
          .setLabel('Suporte')
					.setStyle(ButtonStyle.Link)
          .setURL('https://discord.gg/pJyY3zsMmB')
			);

      let embedBotinfo = new EmbedBuilder()
        .setTitle(`${client.emotes.nothing}${client.emotes.nothing}${client.emotes.nothing}${client.emotes.nothing} ・Minhas informações principais・ ${client.emotes.nothing}${client.emotes.nothing}${client.emotes.nothing}`)
        .setDescription(`> ${client.emotes.hello} __Olá__, __sou__ ${client.user.tag}, __seu bot de moderação para o Discord__, completo e simples para seu servidor e feito em ${client.emotes.slash} SlashCommands`)
        .addFields({
          name: `━・Dados「${client.emotes.analytics}」`,
          value: `> › Servidores: ${inlineCode(client.status.guilds)}\n> › RAM: ${inlineCode(ram)}\n> › Uptime: ${inlineCode(client.tools.uptime())}\n> › Versão: ${inlineCode(version)}`,
          inline: true
        }, {
          name: `━・Criadores「${client.emotes.dev}」`,
          value: `> › ${inlineCode(await client.users.fetch(client.developers[0]).then(a => a.tag))}\n> › ${inlineCode(await client.users.fetch(client.developers[1]).then(a => a.tag))}`,
          inline: true
        }, {
          name: `━・Adicionais「${client.emotes.info}」`,
          value: `> › Sou desenvolvido em ${client.emotes.djs} Discord.js\n> › Fui criado <t:${parseInt(client.user.createdTimestamp / 1000)}:R>`,
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

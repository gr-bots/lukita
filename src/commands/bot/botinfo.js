import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, EmbedBuilder, inlineCode } from 'discord.js';
import { Command } from '../../structures/Command.js';
import { emjs } from '../../utils/Emojis.js';
import { Pallete } from '../../utils/Functions.js'
const clr = new Pallete()

export default class BotinfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'botinfo',
      description: '「💙 Bot」・Saiba mais sobre mim e minhas informações detalhadas',
      type: ApplicationCommandType.ChatInput,
      devOnly: false,
    });
  }

  async execute({ interaction }) {
    let version = "v" + await import('../../../package.json', { assert: {type: "json"}}).then(x => x.default.version)
    let x = String(parseInt(process.memoryUsage().rss / 1024 / 1024) / 512).split('.')[1].slice(0, 4)
    let ram = String(parseInt(x)).slice(0, 2) + '%'

    const rowBotinfo = new ActionRowBuilder()
		.addComponents(new ButtonBuilder().setLabel('Me adicione').setStyle(ButtonStyle.Link).setURL('https://discord.com/oauth2/authorize?client_id=917962601923760139&scope=bot+identify+guilds+email+applications.commands&permissions=2080374975'))
        .addComponents(new ButtonBuilder().setLabel('Suporte').setStyle(ButtonStyle.Link).setURL('https://discord.gg/pJyY3zsMmB'));

    let embedBotinfo = new EmbedBuilder()
        .setAuthor({ name: `${this.client.user.username}・Informações`, iconURL: `${this.client.user.displayAvatarURL({display: true, size: 4096})}` })
        .setDescription(`> Fui feito em ${emjs.discordjs} [Discord.js](https://discord.js.org/#/) utilizando ${emjs.javascript} [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)\n> Use </help:998743092612055060> para ver meus comandos`)
        .addFields({ name: `━・Dados「:satellite:」`, value: `> › Servidores: ${inlineCode(this.client.guilds.cache.size)}\n> › Memória processado: ${inlineCode(ram)}\n> › Tempo ativo: <t:${~~((Date.now() / 1000) - (this.client.uptime / 1000))}:R>\n> › Versão: ${inlineCode(version)}`, inline: true })
        .setFooter({ text: `Criado por ${await this.client.users.fetch(this.client.dev[0]).then(a => a.tag)}` })
        .setColor(`${clr.blueBaby}`)
      
        interaction.reply({ embeds: [embedBotinfo], components: [rowBotinfo] })
  }
}

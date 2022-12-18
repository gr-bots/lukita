import { ApplicationCommandType, EmbedBuilder } from 'discord.js';
import { Command } from '../../structures/Command.js';
import { emjs } from '../../utils/Emojis.js';
import { Tools } from '../../utils/Functions.js'

export default class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      description: '「💙 Bot」・Acesse minha lista completa de comandos',      
      type: ApplicationCommandType.ChatInput,
      devOnly: false,
    });
  }

  async execute({ interaction }) {
    const { client, guild, user, member, channel } = interaction
    const tools = new Tools(client, interaction)

    let utils = await this.client.application.commands.fetch().then(r => r.filter(categ => categ.description.includes('🔧')).size)
    let servercateg = await this.client.application.commands.fetch().then(r => r.filter(categ => categ.description.includes('📘')).size)

    interaction.reply({ embeds: [
      new EmbedBuilder()
      .setAuthor({ name: `${this.client.user.username}・Help`, iconURL: `${interaction.guild.iconURL({dynamic: true, size: 4096})}` })
      .setTitle('Lista de comandos')
      .setDescription(`:wink: **${interaction.member.user.tag}** seja bem vindo a minha central de ajuda e help dos meus comandos. \n\n${emjs.categBot} › __Informações (Bot)__ \`[ ${await this.client.application.commands.fetch().then(r => r.filter(categ => categ.description.includes('💙')).size)} ]\` \n${await this.client.application.commands.fetch().then(r => r.filter(categ => categ.description.includes('💙')).map(cmd => `</${cmd.name}:${cmd.id}>`).join(' - '))}\n\n${emjs.categUtil} › __Utilidades (Util)__ \`[ ${utils + servercateg + 1} ]\` \n- ${await this.client.application.commands.fetch().then(r => r.filter(categ => categ.description.includes('🔧')).map(cmd => `</${cmd.name} ${cmd.options[0].name}:${cmd.id}>`).join(' - '))} - ${await this.client.application.commands.fetch().then(r => r.filter(categ => categ.description.includes('📘')).map(cmd => `</${cmd.name} ${cmd.options[1].name}:${cmd.id}>`).join(' - '))} - ${await this.client.application.commands.fetch().then(r => r.filter(categ => categ.description.includes('📘')).map(cmd => `</${cmd.name} ${cmd.options[0].name}:${cmd.id}>`).join(' - '))} - ${await this.client.application.commands.fetch().then(r => r.filter(categ => categ.description.includes('📘')).map(cmd => `</${cmd.name} ${cmd.options[1].name}:${cmd.id}>`).join(' - '))}`)
      .setColor(`${tools.randomHex()}`)
      .setFooter({ text: `Sou um jovem disposto a deixar seu servidor melhor e mais divertido sendo multifuncional. ` })
    ], iconURL: `${this.client.user.displayAvatarURL({ format: 'png', size: 4096 })}` })
  }
}

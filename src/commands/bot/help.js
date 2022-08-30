import { ApplicationCommandType, EmbedBuilder } from 'discord.js';
import { Command } from '../../structures/Command.js';

export default class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      description: '「💙 Bot」・Acesse minha lista completa de comandos',      
      type: ApplicationCommandType.ChatInput,
    });
  }

  async execute({ interaction }) {
    let embedHelp = new EmbedBuilder()
      .setAuthor({ name: `${this.client.user.username}・Help`, iconURL: `${interaction.guild.iconURL({dynamic: true, size: 4096})}` })
      .setTitle('Lista de comandos')
      .setDescription(`:wink: **${interaction.member.user.tag}** seja bem vindo a minha central de ajuda e help dos meus comandos. \n\n${this.client.emj.categBot} › Informações (Bot) \`[ 3 ]\` \n</botinfo:997023687356186685> - </help:998743092612055060> - </ping:997023687356186686>`)
      .setColor(this.client.clr.blueBaby)
      .setFooter({ text: `Sou um jovem disposto a deixar seu servidor melhor e mais divertido sendo multifuncional. ` })
    interaction.reply({ embeds: [embedHelp], iconURL: `${this.client.user.displayAvatarURL({ format: 'png', size: 4096 })}` })
  }
}

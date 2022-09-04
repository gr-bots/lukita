import { Event } from '../structures/Event.js';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default class MessageCreate extends Event {
  constructor() {
    super();
    this.eventName = 'messageCreate';
  }

  execute(client, message) {
    if(message.author.bot) return;
    if(!message.guild) return;
      
    if(message.content == `<@!${client.user.id}> || <@${client.user.id}>`) {
      const rowMention = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel('Me adicione em seu servidor').setStyle(ButtonStyle.Link).setURL('https://discord.com/oauth2/authorize?client_id=917962601923760139&scope=bot+identify+guilds+email+applications.commands&permissions=2080374975'));

      message.reply({ content: `> :man_raising_hand::skin-tone-1:・Olá **${message.author.username}**, sou um jovem disposto a deixar sua moderação muito mais fácil.\nSou um bot feito em SlashCommands, sendo assim, use </help:998743092612055060> para ver meus comandos.`, components: [rowMention] })
    }
  }
}

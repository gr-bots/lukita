import Event from '../structures/Event.js'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default class extends Event {
  constructor(client) {
   super(client, {
     name: 'messageCreate'
   })
}

  async run (message) {
  
    if(message.author.bot) return;
    if(!message.guild) return;
      
    if(message.content == `<@${this.client.user.id}>`) {

      const  rowMention = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
          .setLabel('Me adicione em seu servidor')
					.setStyle(ButtonStyle.Link)
          .setURL('https://discord.com/oauth2/authorize?client_id=917962601923760139&scope=bot+identify+guilds+email+applications.commands&permissions=2080374975')
			);

      message.reply({ content: `> ${this.client.emotes.hie}・Olá **${message.author.username}**, sou um jovem disposto a deixar sua moderação muito mais fácil. Sou um bot feito em SlashCommands.`, components: [rowMention] })
    }
  
  }
}
import { Event } from '../structures/Event.js';
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { inspect } from 'util';
import { emjs } from '../utils/Emojis.js';
import { Tools, Pallete } from '../utils/Functions.js'
const clr = new Pallete()

export default class MessageCreate extends Event {
  constructor() {
    super();
    this.eventName = 'messageCreate';
  }

  async execute(client, message) {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.channel.id === '1053448395655741550') {
      if(message.content === '.') {
        message.member.setNickname(`${await message.member.user.username} 🎅`)
        message.delete()
      }
    }
      
    if(message.content == `<!@${client.user.id}>` || message.content == `<@${client.user.id}>`) {
      const rowMention = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel('Me adicione em seu servidor').setStyle(ButtonStyle.Link).setURL('https://discord.com/oauth2/authorize?client_id=917962601923760139&scope=bot+identify+guilds+email+applications.commands&permissions=2080374975'));

      message.reply({ content: `> :man_raising_hand::skin-tone-1:・Olá **${message.author.username}**, sou um jovem disposto a deixar sua moderação muito mais fácil.\nSou um bot feito em SlashCommands, sendo assim, use </help:998743092612055060> para ver meus comandos.`, components: [rowMention] })
    }
  }
}

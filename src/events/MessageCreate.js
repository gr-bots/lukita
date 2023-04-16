import { Event } from '../structures/Event.js';
import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, EmbedBuilder, inlineCode } from 'discord.js';
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
    if (message.guild) return;
    if (message.author.bot) return;

    if (message.guild.id === '995769279733583944') {
      if (message.author.id === '297153970613387264') {
        if (message?.embeds[0]?.title?.includes('Que tal experimentar Slash Commands?')) { 
          message.delete(); 
        } else if (message?.embeds[0]?.title?.includes('Why not try out the new Slash Commands?')) { 
          message.delete(); 
        }
      }
    }
    if(message.content == `<!@${client.user.id}>` || message.content == `<@${client.user.id}>`) {
      const rowMention = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel('Me adicione em seu servidor').setStyle(ButtonStyle.Link).setURL('https://discord.com/oauth2/authorize?client_id=917962601923760139&scope=bot+identify+guilds+email+applications.commands&permissions=2080374975'));

      message.reply({ content: `> :man_raising_hand::skin-tone-1:・Olá **${message.author.username}**, sou um jovem disposto a deixar sua moderação muito mais fácil.\nSou um bot feito em SlashCommands, sendo assim, use </help:998743092612055060> para ver meus comandos.`, components: [rowMention] })
    }
  }
}

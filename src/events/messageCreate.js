const Event = require('../../structures/Event')
module.exports = class extends Event {
  constructor(client) {
   super(client, {
     name: 'messageCreate'
   })
}

    run = async (message) => {
      if(message.author.bot) return;
      if(!message.guild) return;
    
      if(message.content == `<@${client.user.id}>`) {
    
      message.reply({ content: `> ${client.emotes.hie}・Olá ${message.author.username}, ainda estou em desenvolvimento. Em breve terei minha lista comandos. (Não tenho comando de help ainda.)` })
    }
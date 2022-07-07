import Event from '../structures/Event.js'

export default class extends Event {
  constructor(client) {
   super(client, {
     name: 'messageCreate'
   })
}

   async run (message) {
      if(!message.guild) return;
    
      if(message.content == `<@${client.user.id}>`) {
    
      message.reply({ content: `> ${client.emotes.hie}・Olá ${message.author.username}, ainda estou em desenvolvimento. Em breve terei minha lista comandos. (Não tenho comando de help ainda.)` })
    }
   }

}

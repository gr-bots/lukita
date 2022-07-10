import Event from '../structures/Event.js'

export default class extends Event {
  constructor(client) {
   super(client, {
     name: 'modalSubmit'
   })
}
    run = async (interaction) => {

        let command = this.client.modals.get(interaction.customId )
        if(!command) return;

        try {
            await command.run(this.client, interaction);
        } catch (error) {
            await interaction.reply({ content: `> ${this.client.emotes.noCheck}・<@${interaction.member.id}>, Ocorreu um erro ao executar o comando! Já avisei os meus desenvolvedores.` });
            console.log(error)
        }

    }
}
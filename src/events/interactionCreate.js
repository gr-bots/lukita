import Event from '../structures/Event.js';

export default class extends Event {
  constructor(client) {
   super(client, {
     name: 'interactionCreate'
   })
}

async run (interaction) {

    if (interaction.isCommand()) {

        let command = this.client.commands.get(interaction.commandName)
        if (!command) return;
        const args = [];

        for (let option of interaction.options.data) {

            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        cmd.run(client, interaction, args);

        try {
            if (command.devsOnly && !this.client.developers.includes(interaction.member.id)) {
                return interaction.reply({ content: `${this.client.emotes.alert}・<@${interaction.member.id}>, Você não é um dos meus desenvolvedores.`, ephemeral: true })
            }
            await command.run(this.client, interaction);
        } catch (error) {
            await interaction.reply({ content: `> ${this.client.emotes.alert}・<@${interaction.member.id}>, Ocorreu um erro ao executar o comando! Já avisei os meus desenvolvedores.`, ephemeral: true });
            console.log(error)
        }
        
    }

}
}
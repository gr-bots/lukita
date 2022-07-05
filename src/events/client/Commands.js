module.exports = {
    name: "interactionCreate",
    client: true,
    cluster: false,
    run: async (client, interaction) => {

        if (interaction.isCommand()) {

            let command = client.commands.get(interaction.commandName)
            if (!command) return;

            try {
                if (command.devsOnly && !client.developers.includes(interaction.member.id)) {
                    return interaction.reply({
                        content: `${client.emotes.alert}・<@${interaction.member.id}>, Você não é um dos meus desenvolvedores.`,
                        ephemeral: true
                    })
                }
                await command.run(client, interaction);
            } catch (error) {
                await interaction.reply({ content: `> ${client.emotes.alert}・<@${interaction.member.id}>, Ocorreu um erro ao executar o comando! Já avisei os meus desenvolvedores.`,
                ephemeral: true });
                console.log(error)
            }

        }

    }
}
module.exports = {
    name: "modalSubmit",
    client: true,
    cluster: false,
    run: async (client, interaction) => {

        let command = client.modals.get(interaction.customId )
        if(!command) return;

        try {
            await command.run(client, interaction);
        } catch (error) {
            await interaction.reply({ content: `> ${client.emotes.noCheck}・<@${interaction.member.id}>, Ocorreu um erro ao executar o comando! Já avisei os meus desenvolvedores.` });
            console.log(error)
        }

    }
}
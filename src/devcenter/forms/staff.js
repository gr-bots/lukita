import { Modal, TextInputComponent } from 'discord.js';

export default {
    name: "staff",
    data: {
        name: "staff",
        description: "「📝 Forms」・Formulário para a staff da Dev. Center",
        type: 1,
        options: []
    },
    category: 'Forms',
    view: false,
    devsOnly: true,
    run: async(client, interaction) => {

        let modalStaff= new Modal()

        .setTitle('Formulário Staff')
        .setCustomId('staff_modal')
        .addComponents(
            new TextInputComponent()
            .setCustomId('resposta1')
            .setLabel('Pergunta1')
            .setStyle('LONG')
            .setPlaceholder('Digite sua resposta')
            .setRequired(true)
        )

        interaction.showModal(modalStaff, {
            client,
            interaction
        })
    
    }
}

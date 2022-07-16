import { Modal, TextInputComponent } from 'discord.js';

export default {
    name: "eval",
    data: {
        name: "eval",
        description: "「🧙 Developers」・Para meus desenvolvedores executarem códigos",
        type: 1,
        options: []
    },
    category: 'Developers',
    view: false,
    devsOnly: true,
    run: async(client, interaction) => {

        let modalEval = new Modal()

        .setTitle('Eval')
        .setCustomId('staff_modal')
        .addComponents(
            new TextInputComponent()
            .setCustomId('code')
            .setLabel('Digite o código abaixo')
            .setStyle('LONG')
            .setPlaceholder('😅 Códiguin...')
            .setRequired(true)
        )

        interaction.showModal(modalEval, {
            client,
            interaction
        })
    
    }
}

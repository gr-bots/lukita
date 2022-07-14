import { Modal, TextInputComponent, showModal } from 'discord-modals';

export default {
    name: "eval",
    data: {
        name: "eval",
        description: "「💙 Dev」・Execute um código JavaScript",
        options: []
    },
    category: 'Developers',
    view: false,
    devsOnly: true,
    run: async(client, interaction) => {

        let modalEval = new Modal()

        .setTitle('Eval')
        .setCustomId('eval_modal')
        .addComponents(
            new TextInputComponent()
            .setCustomId('code')
            .setLabel('Digite o código abaixo')
            .setStyle('LONG')
            .setPlaceholder('😅 Códiguin...')
            .setRequired(true)
        )

        showModal(modalEval, {
            client,
            interaction
        })
    
    }
}
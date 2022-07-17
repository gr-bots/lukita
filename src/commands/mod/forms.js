import { Modal, TextInputComponent, showModal } from 'discord-modals';

export default {
    name: "form",
    data: {
        name: "form",
        description: `「📝 Forms」・${formDescription || 'Comando de formulário personalizavel'}`,
        type: 1,
        options: []
    },
    category: 'Forms',
    view: false,
    devsOnly: true,
    run: async(client, interaction) => {

        let modalForm = new Modal()

        .setTitle(`${formTitle || 'Formulário Personalizado'}`)
        .setCustomId('form_modal')
        .addComponents(
            new TextInputComponent()
            .setCustomId('resposta1')
            .setLabel('Pergunta1')
            .setStyle('LONG')
            .setPlaceholder('Digite sua resposta')
            .setRequired(true)
        )

        showModal(modalForm, {
            client,
            interaction
        })
    
    }
}
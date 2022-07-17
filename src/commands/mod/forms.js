import { Modal, TextInputComponent, showModal } from 'discord-modals';

export default {
    name: "form",
    data: {
        name: "form",
        description: `「📝 Forms」・Formulário personalizado`,
        type: 1,
        options: []
    },
    category: 'Forms',
    view: false,
    devsOnly: true,
    run: async(client, interaction) => {
        
        const formTitle = client.db.get('guilds', `${interaction.guild.id}/configs/forms/title`)	
        const question_1 = client.db.get('guilds', `${interaction.guild.id}/configs/forms/description`)	

        let modalForm = new Modal()

        .setTitle(`${formTitle || 'Formulário Personalizado'}`)
        .setCustomId('form_modal')
        .addComponents(
            new TextInputComponent()
            .setCustomId('resposta1')
            .setLabel(`${question_1 || 'Pergunta 1'}`)
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
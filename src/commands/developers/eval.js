import { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export default {
    name: "eval",
    data: {
        name: "eval",
        description: "「🧙 Developers」・Para meus desenvolvedores executarem códigos em mim",
        type: 1,
        options: []
    },
    category: 'Developers',
    view: false,
    devsOnly: true,
    run: async (client, interaction) => {
        const first = new ActionRowBuilder().addComponents([new TextInputBuilder().setCustomId('eval-code').setLabel('Digite o código abaixo').setStyle(TextInputStyle.Paragraph).setPlaceholder('😅 Códiguin...').setRequired(true)]);
        const modal = new ModalBuilder().setCustomId('evalModal').setTitle(` ・Evaluate the Code・ `).addComponents([first]);
        await interaction.showModal(modal);
    }
}

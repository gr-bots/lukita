import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, inlineCode } from 'discord.js';

export default {
    name: "warn",
    data: {
        name: "warn",
        description: "「🔨 Moderação」・Aplique um aviso a um membro",
        options: [{
            name: "usuário",
            type: 6,
            description: "Insira o usuário que deseja aplicar o warn",
            required: true
        }, {
            name: "motivo",
            type: 3,
            description: "Insira o motivo do aviso"
        }]
    },
    category: 'Mod',
    view: true,
    devsOnly: false,
    run: async (client, interaction) => {
        const motivoWarn = interaction.options
        const usuarioWarn = interaction.options.getUser("usuário")

        let embedWarn = new EmbedBuilder()
            .setTitle('Aviso')
            .setDescription(`Motivo: ${motivoWarn}`)
            .setColor(`${client.pallete.noBG}`)

        interaction.reply({ embeds: [embedWarn] });
    }
}
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, codeBlock, inlineCode } from 'discord.js'

export default {
    name: 'form_modal',
    run: async (client, interaction) => {
        let resposta1 = interaction.getTextInputValue('resposta1');
        
        if (!resposta1) return interaction.reply({ content: `> ${client.emotes.alert}・<@${interaction.member.id}>, Você precisa inserir uma reposta para ser enviado.` })
        interaction.reply({content: `${resposta1}`, ephemeral: true})
    }
}

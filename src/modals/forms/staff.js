import { codeBlock, inlineCode } from '@discordjs/builders'
import { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton } from 'discord.js'

export default {
    name: 'staff_modal',
    run: async (client, interaction) => {
let resposta1 = interaction.getTextInputValue('resposta1');
interaction.reply({content: `${resposta1}`})
}

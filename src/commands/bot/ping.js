import { SlashCommandBuilder, inlineCode } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

export default {
    name: "ping",
    category: 'Bot',
    view: true,
    devsOnly: false,
    data: new SlashCommandBuilder().setName("ping").setDescription("「💙 Bot」・Veja minha latência atual"),
    run: async (client, interaction) => {

        const authorAvatarURL = interaction.member.displayAvatarURL({ dynamic: true })
        const ping = await client.fb.ping()
        
        let bahzin = await interaction.reply({ 
            content: `${client.emotes.loading}`, 
            fetchReply: true 
        })
        
        let embed = new MessageEmbed()
        .setAuthor({ iconURL: `${authorAvatarURL}`, name: `${interaction.member.user.tag}` })
        .setDescription(`> ${client.emotes.signal} Gataway \`${Math.round(client.ws.ping)}ms\`\n> ${client.emotes.lighting} API \`${bahzin.createdTimestamp - interaction.createdTimestamp}ms\`\n> ${client.emotes.firebase} Firebase \`${ping}ms\``)
        .setColor(client.pallete.noBG)
        .setFooter({ text: 'Solicitado' })
        .setTimestamp()
        
        setTimeout(() => {
            interaction.editReply({
                content: `<@${interaction.member.user.id}>`,
                embeds: [embed]
            })
        }, 3000)

    }
}
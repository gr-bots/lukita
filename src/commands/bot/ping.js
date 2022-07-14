import { MessageEmbed } from 'discord.js';

export default {
    name: "ping",
    data: {
        name: "ping",
        description: "「💙 Bot」・Veja minha latência atual",
        type: 1,
        options: []
    },
    category: 'Bot',
    view: true,
    devsOnly: false,
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
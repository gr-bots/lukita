import { EmbedBuilder } from 'discord.js';

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

        async function pingMongo() {
            const pingStart = process.hrtime();
            await client.db.guild.findOne({ _id: interaction.guild.id });
            const pingStop = process.hrtime(pingStart);
            const pingDb = Math.round(((pingStop[0] * 1e9) + pingStop[1]) / 1e6);
            return pingDb;
        }
        
        async function pingFb() {
            const pingStartFB = process.hrtime();
            await client.fb.ref('ping').once('value');
            const pingStopFB = process.hrtime(pingStartFB);
            const pingFB = Math.round(((pingStopFB[0] * 1e9) + pingStopFB[1]) / 1e6);
            return pingFB;
        }

        const authorAvatarURL = interaction.member.displayAvatarURL({ dynamic: true })
        
        let bahzin = await interaction.followUp({ 
            content: `${client.emotes.loading}`, 
            fetchReply: true 
        })
        
        let embed = new EmbedBuilder()
            .setAuthor({ iconURL: `${authorAvatarURL}`, name: `${interaction.member.user.tag}` })
            .setDescription(`> ${client.emotes.signal} Gateaway \`${Math.round(client.ws.ping)}ms\`\n> ${client.emotes.lighting} API \`${bahzin.createdTimestamp - interaction.createdTimestamp}ms\`\n> ${client.emotes.mongodb} MongoDB \`${await pingMongo()}ms\`\n> ${client.emotes.firebase} Firebase \`${await pingFb()}ms\``)
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

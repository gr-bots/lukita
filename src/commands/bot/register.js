import { EmbedBuilder } from 'discord.js';

export default {
    name: "register",
    data: {
        name: "register",
        description: "Comando temporário",
        type: 1,
        options: []
    },
    category: 'Bot',
    view: false,
    devsOnly: true,
    run: async (client, interaction) => {
        let register = new EmbedBuilder()
            .setAuthor({ iconURL: `${client.user.displayAvatarURL({ dynamic: true, size: 4096, format: 'png' })}`, name: `${client.user.tag}` })
            .setDescription('a')
            .setColor(client.pallete.noBG)
            .setFooter({ text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true })}` })
        interaction.channel.send({embeds: [register]})
    }
}
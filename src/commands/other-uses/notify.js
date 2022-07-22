import { EmbedBuilder } from 'discord.js';

export default {
    name: "notify",
    data: {
        name: "notify",
        description: "「🧙 Developers」・Notify (Other-uses)",
        type: 1,
        options: []
    },
    category: 'Other-uses',
    view: false,
    devsOnly: true,
    run: async (client, interaction) => {
        interaction.followUp('🔔 Notify');
        let register = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL({ format: 'png', size: 4096 }))
            .setAuthor({ iconURL: `${client.user.displayAvatarURL({ size: 4096, format: 'png' })}`, name: `${client.user.tag}` })
            .setDescription(`Para não marcarmos @everyone toda hora, criamos esses cargos específicos. Reaja nos emojis correspondentes para obter os cargos.\n\n📢 <@&995850502153711787>\n🤝 <@&995850735386370048>\n🍃 <@&995850976860831784>\n🎉 <@&999851022228918366>\n⚰️ <@&999850970152448174>`)
            .setColor(client.pallete.noBG)
            .setFooter({ text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true })}` })
        interaction.channel.send({embeds: [register]})
        interaction.react('📢')
        interaction.react('🤝')
        interaction.react('🍃')
        interaction.react('🎉')
        interaction.react('⚰️')
    }
}
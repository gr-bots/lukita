export default {
    name: "waffles",
    description: "「🧇 Eco」・Veja quantos waffles você possui",
    category: 'Eco',
    view: false,
    devsOnly: true,
    run: async (client, interaction) => {

      interaction.reply({ 
            content: `${client.emotes.eco.waffles}`
        })
      
    }
}
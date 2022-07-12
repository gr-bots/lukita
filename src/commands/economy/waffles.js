export default {
    name: "waffles",
    category: 'Eco',
    view: false,
    devsOnly: true,
    data: { name: "waffles", description: "「🧇 Eco」・Veja quantos waffles você possui." },
    run: async (client, interaction) => {

      interaction.reply({ 
            content: `${client.emotes.eco.waffles}`
        })
      
    }
}
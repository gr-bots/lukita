import { EmbedBuilder } from 'discord.js';

export default {
    name: "avatar",
    data: {
        name: "avatar",
        description: "「🔧 Utilities」・Exiba o avatar de um usuário",
        type: 1,
        options: [{
            name: "usuário",
            description: "O usuário que você deseja exibir o avatar",
            type: 6
        }]
    },
    category: 'Utilities',
    view: true,
    devsOnly: false,
    run: async (client, interaction) => {

    }
}
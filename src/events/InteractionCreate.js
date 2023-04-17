import { Event } from '../structures/Event.js';
export default class InteractionCreate extends Event {
    constructor() {
        super();
        this.eventName = 'interactionCreate';
    }

    async execute(client, interaction) {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.guild) return;

        const command = client.commands.getCommand(interaction.commandName);

        let User = await client.db.user.findOne({ _id: interaction.user.id });
        if (!User) {
            await client.db.user.create({ _id: interaction.user.id });
            User = await client.db.user.findOne({ _id: interaction.user.id });
        }

        if (User.bl == true) return interaction.reply({ content: `> ⚠️・<@${user.id}>, Err... Parece quem alguém na Blacklist..\n> Você está bloqueado de usar meus comandos.`, ephemeral: true, fetchReply: true }); //assim não vai poluir seus comandos

        try {
            if (command.options.devOnly == true && !client.dev.some((id) => id === interaction.user.id)) return interaction.reply({ content: `⚠️・<@${interaction.user.id}>, Você não é meu desenvolvedor.`, fetchReply: true, ephemeral: true });

            await command?.execute({ client, interaction });
        } catch (error) {
            console.log(error.stack)
            await interaction.reply({ content: `> ⚠️・<@${interaction.user.id}>, Ocorreu um erro ao executar o comando! Já avisei meu desenvolvedor.`, ephemeral: true, fetchReply: true });
        }
    }
}

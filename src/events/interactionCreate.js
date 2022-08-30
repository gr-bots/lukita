import { Event } from '../structures/Event.js';

export default class InteractionCreate extends Event {
  constructor() {
    super();
    this.eventName = 'interactionCreate';
  }

  async execute(client, interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.getCommand(interaction.commandName);

    command?.execute({ interaction });
    try {
        if (command.devsOnly && !client.dev.includes(interaction.member.id)) {
                return interaction.reply({ content: `⚠️・<@${interaction.member.id}>, Você não é um dos meus desenvolvedores.`, ephemeral: true })
                }
                await command.run(this.client, interaction);
        } catch (error) {
            console.log(error)
            await interaction.reply({ content: `> ⚠️・<@${interaction.member.id}>, Ocorreu um erro ao executar o comando! Já avisei os meus desenvolvedores.`, ephemeral: true });
        }
  }
}

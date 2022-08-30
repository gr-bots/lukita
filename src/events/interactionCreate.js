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
        if (command.devsOnly === true && interaction.member.user.id !== client.dev.includes(interaction.member.id)) {
                return interaction.reply({ content: `⚠️・<@${interaction.member.id}>, Você não é meu desenvolvedor.`, fetchReply: true, ephemeral: true })
                }
        } catch (error) {
            await interaction.reply({ content: `> ⚠️・<@${interaction.member.id}>, Ocorreu um erro ao executar o comando! Já avisei meu desenvolvedor.`, ephemeral: true });
        }
  }
}

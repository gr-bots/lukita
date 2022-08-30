import { ApplicationCommandType, EmbedBuilder } from 'discord.js';
import { Command } from '../../structures/Command.js';

export default class EvalCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'eval',
      description: '「✨ Developer」・  Execução de códigos do meu desenvolvedor',    
      type: ApplicationCommandType.ChatInput,
    });
    this.devOnly = true
  }

  async execute({ interaction }) {
    
  }
}

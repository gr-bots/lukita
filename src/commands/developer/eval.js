import { ApplicationCommandType, EmbedBuilder } from 'discord.js';
import { inspect } from 'util';
import { Command } from '../../structures/Command.js';

export default class EvalCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'eval',
      description: '「✨ Developer」・  Execução de códigos do meu desenvolvedor',    
      type: ApplicationCommandType.ChatInput,
      options: [{ 
        name: 'code',
        description: 'Digite o código',
        type: ApplicationCommandOptionType.String, 
        required: true
      }],
    });
    this.devOnly = true
  }

  async execute({ interaction }) {
    try {
      const code = await eval(interaction.args.join(' '));
      const codeLeave = typeof code !== 'string' ? inspect(code, { depth: 0 }).replaceAll(this.client.token, 'hidden') : code.replaceAll(this.client.token, 'hidden');
      return interaction.reply({ content: `\`\`\`js\n${codeLeave.slice(0, 1900)}\`\`\``, ephemeral: true });
    } catch (err) {
      if (err instanceof Error) {
        return interaction.reply({ content: `\`\`\`js\n${err.stack}\`\`\``, ephemeral: true });
      }
    }
  }
}

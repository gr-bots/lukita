import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { inspect } from 'util';
import { Command } from '../../structures/Command.js';
import { emjs } from '../../utils/Emojis.js';
import { Tools, Pallete } from '../../utils/Functions.js'
const clr = new Pallete()

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
      devOnly: true,
    });
    
  }

  async execute({ interaction }) {
    const { client, guild, user, member } = interaction
    const tools = new Tools(client, interaction)
    
    try {
      const code = await eval(interaction.options.getString('code'));
      const codeLeave = typeof code !== 'string' ? inspect(code, { depth: 0 }).replaceAll(this.client.token, 'hidden') : code.replaceAll(this.client.token, 'hidden');
      return interaction.reply({ content: `**${emjs.yesCheck}・Output:**\n\`\`\`js\n${codeLeave.slice(0, 1900)}\`\`\``, ephemeral: true });
    } catch (err) {
      if (err instanceof Error) {
        return interaction.reply({ content: `**${emjs.noCheck}・Error:**\n\`\`\`js\n${err.stack}\`\`\``, ephemeral: true });
      }
    }
  }
}

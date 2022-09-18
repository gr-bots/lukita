import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { exec } from 'child_process';
import { Command } from '../../structures/Command.js';
import { emjs } from '../../utils/Emojis.js';
export default class ShellCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'shell',
      description: '「✨ Developer」・  Execução de comandos em meu terminal',    
      type: ApplicationCommandType.ChatInput,
      options: [{ 
        name: 'comando',
        description: 'Digite o comando',
        type: ApplicationCommandOptionType.String, 
        required: true
      }],
      devOnly: true,
    });
  }
  
  async execute({ interaction }) {
    const comando = interaction.options.getString('comando');
    
    exec(comando, (res) => {
      const RGX = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
      try {
        return interaction.reply({ content: `**${emjs.yesCheck}・Output:**\n\`\`\`bash\n${res.replace(RGX, '').slice(0, 1900)}\`\`\``, ephemeral: true });
      } catch (err) {
        if (err instanceof Error) {
          return interaction.reply({ content: `**${emjs.noCheck}・Error:**\n\`\`\`cmd\n${err.stack}\`\`\``, ephemeral: true, fetchReply: true });
        }
      }
    });
  }
}

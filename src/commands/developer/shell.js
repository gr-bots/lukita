import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { exec } from 'child_process';
import { Command } from '../../structures/Command.js';
import { emjs } from '../../utils/Emojis.js';
const RGX = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
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

    exec(comando, (err, res) => {
      if (err) {
        return interaction.reply({ content: `**${emjs.noCheck}・Error:**\n\`\`\`sh\n${err}\`\`\``, ephemeral: true, fetchReply: true });
      } else {
        return interaction.reply({ content: `**${emjs.yesCheck}・Output:**\n\`\`\`sh\n${res.replace(RGX, '').slice(0, 1900)}\`\`\``, ephemeral: true });
      }
    });
  }
}

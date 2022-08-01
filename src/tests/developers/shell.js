import { exec } from 'child_process';
const ANSI_REGEX = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

export default {
    name: 'shell',
    data: {
        name: "shell",
        description: "「🧙 Developers」・Para meus desenvolvedores executarem no meu terminal",
        type: 1,
        options: []
    },
    category: 'Developers',
    view: false,
    devsOnly: true,
    run: async (interaction, args) => {
     
        let codeTerminal = args.join(' ');
        if(!codeTerminal) return;

        exec(codeTerminal, (err, res) => {

            if(err) return interaction.reply(`${codeBlock(err)}`);

            interaction.reply({
                content: `\`\`\`\n$ ${codeTerminal}\n\n${res.replace(ANSI_REGEX, '').slice(0, 1900)}\`\`\``
            });
            
        });

        const first = new ActionRowBuilder().addComponents([new TextInputBuilder().setCustomId('shell-code').setLabel('Digite a linha comando abaixo').setStyle(TextInputStyle.Paragraph).setPlaceholder('😅 Códiguin...').setRequired(true)]);
        const modal = new ModalBuilder().setCustomId('shellModal').setTitle(` ・Execute um código em meu terminal・ `).addComponents([first]);
        await interaction.showModal(modal);
    },
}
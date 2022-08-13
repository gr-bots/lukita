import { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export default {
    name: "eval",
    data: {
        name: "eval",
        description: "「🧙 Developers」・Para meus desenvolvedores executarem códigos em mim",
        type: 1,
        options: []
    },
    category: 'Developers',
    view: false,
    devsOnly: true,
    run: async (client, interaction) => {
        const first = new ActionRowBuilder().addComponents([new TextInputBuilder().setCustomId('eval-code').setLabel('Digite o código abaixo').setStyle(TextInputStyle.Paragraph).setPlaceholder('😅 Códiguin...').setRequired(true)]);
        const modal = new ModalBuilder().setCustomId('evalModal').setTitle(` ・Evaluate the Code・ `).addComponents([first]);
        await interaction.showModal(modal);

        if (interaction.type === 5) {
            const { client } = this;
            // Local Functions
            // --- Test color for embed
            const testColor = function testColor(color) {
                let embedTestColor = new EmbedBuilder()
                    .setDescription('Test de cor para embed')
                    .setColor(String(color))

                interaction.channel.send({ embeds: [embedTestColor] })
            };
            // --- Task Manager
            /* function add(managerTasks) {
                client.fb.update('devs', 'tasks', managerTasks)
                return 'sucess'
            };
            function manager(managerTasks) {
                client.fb.set('devs', 'tasks', managerTasks)
                return 'sucess'
            };
            class Tasks {
                constructor() {
                    return {
                        get: client.fb.all('devs/tasks').then(a => a.map(b => b.data.value)),
                        add: add,
                        manager: manager
                    }
                }
            }
            const tasks = new Tasks() */
            // Eval code
            let code = interaction.fields.getTextInputValue('eval-code');

            let deitenau = Date.now() / 1000
            let timezin = parseInt(deitenau)

            let msg1 = `# ㅤㅤㅤㅤㅤㅤE V A L ㅤㅤㅤㅤㅤㅤ#`
            let tag = interaction.member.user.tag
            let msg2 = `   \n ・Tempo de execução: `
            let timezao = `ㅤ ㅤㅤ<t:${timezin}:R>\n`
            let msg3 = `・Entrada: ${code}`

            let resultado;

            try {

                const result = await eval(code)
                resultado = inspect(result, { depth: 0 })
                resultado.replace(client.token, "hidden")

            } catch (error) {

                resultado = error.toString()

            }

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setEmoji('<:delete:983769494340120596>')
                    .setCustomId('del')
                    .setStyle(ButtonStyle.Primary)
                    .setLabel('Deletar')
            )



            if (resultado.length > 2040) {
                let a = Buffer.from(resultado)
                interaction.followUp({
                    content: `${codeBlock('md', msg1 + msg2)} ${timezao}\n${inlineCode(msg3)}`,
                    files: [
                        new AttachmentBuilder({name: 'code.js', file: a, attachment: 'code.js'})
                    ],
                    fetchReply: true,
                    components: [row]
                }).then(async (msg) => {

                    const filter = () => interaction.user.id === interaction.user.id;
                    const collector = msg.createMessageComponentCollector({ filter });

                    collector.on('collect', async x => {
                        if (x.customId === 'del') {
                            await msg.edit({ embeds: [], content: `> ${client.emotes.yesCheck}・<@${interaction.member.id}>, Seu eval foi deletado.`, components: [] })
                            setTimeout(() => {
                                msg.delete();
                            }, 1000)
                        }
                    });

                })
            } else {
                interaction.reply({
                    content: `${codeBlock('md', msg1 + msg2)} ${timezao}\n${inlineCode(msg3)} \n${codeBlock('js', resultado.replace(client.token, "hidden") + "..")}`,
                    fetchReply: true,
                    components: [row]
                }).then(async (msg) => {

                    const filter = (int) => int.user.id === interaction.user.id;
                    const collector = msg.createMessageComponentCollector({ filter });

                    collector.on('collect', async x => {
                        if (x.customId === 'del') {
                            await msg.edit({ embeds: [], content: `> ${client.emotes.yesCheck}・<@${interaction.member.id}>, Seu eval foi deletado.`, components: [] })
                            setTimeout(() => {
                                msg.delete();
                            }, 1000)
                        }
                    });

                })
            }
        }
    }
}

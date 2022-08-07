import Event from '../structures/Event.js';
import { inspect } from 'util';
import { EmbedBuilder, AttachmentBuilder, InteractionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, codeBlock, inlineCode } from 'discord.js';
export default class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    async run(interaction) {
        if (interaction.type === InteractionType.ModalSubmit) {
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
                        new AttachmentBuilder(a, 'code.js')
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
        if (interaction.type === 2) {

            let command = this.client.commands.get(interaction.commandName)
            if (!command) return;

            try {
                if (command.devsOnly && !this.client.developers.includes(interaction.member.id)) {
                    return interaction.reply({ content: `${this.client.emotes.alert}・<@${interaction.member.id}>, Você não é um dos meus desenvolvedores.`, ephemeral: true })
                }
                await command.run(this.client, interaction);
            } catch (error) {
                console.log(error)
                await interaction.reply({ content: `> ${this.client.emotes.alert}・<@${interaction.member.id}>, Ocorreu um erro ao executar o comando! Já avisei os meus desenvolvedores.`, ephemeral: true });
                console.log(error)
            }

        }

    }
}

import { inspect } from 'util'
import { codeBlock, inlineCode } from '@discordjs/builders'
import { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton } from 'discord.js'

export default {
    name: 'eval_modal',
    run: async (client, interaction) => {
      
      // Local Functions
      // --- Test color for embed
        const testColor = function testColor(color) {
          let embedTestColor = new MessageEmbed()
          .setDescription('Test de cor para embed')
          .setColor(String(color))
          
          interaction.channel.send({embeds: [embedTestColor], fetchReply: true})
        };
      // --- Task Manager
        function add(managerTasks) {
            client.db.update('devs', 'tasks', managerTasks)
            return 'sucess'
        };
        function manager(managerTasks) {
            client.db.set('devs', 'tasks', managerTasks)
            return 'sucess'
        };
        class Tasks {
            constructor() {
                return {
                
                    get: client.db.all('devs/tasks').then(a => a.map(b => b.data.value)),
                    add: add,
                    manager: manager

                }
            }
        }
        const tasks = new Tasks()
      // Eval code
        let code = interaction.getTextInputValue('code');
        
        if (!code) return interaction.reply({ content: `> ${client.emotes.alert}・<@${interaction.member.id}>, Você precisa inserir um código para ser executado.` })

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
            resultado = inspect(result, {depth:0})
            resultado.replace(client.token, "hidden")

        } catch (error) {

            resultado = error.toString()

        }

        const button = new MessageButton().setEmoji('<:delete:983769494340120596>').setCustomId('del').setStyle('PRIMARY').setLabel('Deletar')
        const row = new MessageActionRow().addComponents(button)

        

        if (resultado.length > 2040) {
            let a = Buffer.from(resultado)
            interaction.reply({
                content: `${codeBlock('md', msg1 + msg2)} ${timezao}\n${inlineCode(msg3)}`,
                files: [
                    new MessageAttachment(a, 'code.js')
                ],
                fetchReply: true,
                components: [row]
            }).then(async (msg) => {

                const filter = i => i.customId === 'del' && i.user.id === interaction.user.id;
                const collector = msg.createMessageComponentCollector({ filter });

                collector.on('collect', async i => {
                    if (i.customId === 'del') {
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

                const filter = i => i.customId === 'del' && i.user.id === interaction.user.id;
                const collector = msg.createMessageComponentCollector({ filter });

                collector.on('collect', async i => {
                    if (i.customId === 'del') {
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

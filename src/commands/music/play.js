import { SlashCommandBuilder, inlineCode } from '@discordjs/builders';
import { MessageActionRow, MessageButton } from 'discord.js';

export default {
    name: "play",
    category: 'Music',
    view: false,
    devsOnly: true,
    data: new SlashCommandBuilder().setName("play").setDescription("「🎵 Music 」・Toque uma música em um canal de voz").addStringOption(option => 	option.setName('track').setDescription('Coloque o nome ou playlist da musica').setRequired(true)),
    run: async (client, interaction) => {
      const row = new MessageActionRow(
        new MessageButton()
        .setLabel('Suporte')
        .setStyle("LINK")
        .setURL("https://discord.gg/pJyY3zsMmB")
      )
      if (!interaction.member.voice.channel) return interaction.reply({ content: `😔 **|** Desculpe por incomodar mas eu não posso tocar via Bluetooth, entre em um **canal de voz** porfavor!`, ephemeral: true }); 
      const track = interaction.options.getString('track');
      const res = await client.vulkava.search(track);
      if (res.loadType === "LOAD_FAILED") { 
        return interaction.reply({ content: `🤨 **|** Por algum motivo eu não consegui carregar essa faixa, motivo: ${res.exception.message}`, components: [row]});
      } else if (res.loadType === "NO_MATCHES") {
        return interaction.reply('😥 **|** Nem s oque aconteceu aqui, só não achei nada relacionado');
      }
      const player = client.vulkava.createPlayer({ guildId: interaction.guild.id, voiceChannelId: interaction.member.voice.channelId, textChannelId: interaction.channel.id, selfDeaf: true 
}); 
      player.connect();
      if (res.loadType === 'PLAYLIST_LOADED') {
        for (const track of res.tracks) { 
          track.setRequester(interaction.user); 
          player.queue.push(track); 
        } 
        interaction.reply(`Playlist \`${res.playlistInfo.name}\` carregada`);
      } else {
        const track = res.tracks[0]; track.setRequester(interaction.user); 
        player.queue.push(track); 
        interaction.reply(`Fila \`${track.title}\``);
      } 
      if (!player.playing)
        player.play(); 
    }
    }
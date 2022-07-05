const { Client, Options } = require('discord.js');

const client = new Client({
    makeCache: Options.cacheWithLimits({
        ApplicationCommandManager: 0,
        BaseGuildEmojiManager: 0,
        GuildBanManager: 0,
        GuildInviteManager: 0,
        GuildManager: Infinity,
        GuildMemberManager: Infinity,
        GuildStickerManager: 0,
        GuildScheduledEventManager: 0, 
        MessageManager: 0,
        PresenceManager: 0,
        ReactionManager: 0,
        ReactionUserManager: 0,
        StageInstanceManager: 0,
        ThreadManager: 0,
        ThreadMemberManager: 0,
        UserManager: 0,
    }),
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_SCHEDULED_EVENTS", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGES"]
});

client.login(process.env.TOKEN)

client.on("messageCreate", (message) => {

    if(message.author.bot) return;
    if(!message.guild) return;
    
    if(message.content == `<@${client.user.id}>`) {
    
    message.reply({ content: `> ${client.emotes.hie}・Olá ${message.author.username}, ainda estou em desenvolvimento. Em breve terei minha lista comandos. (Não tenho comando de help ainda.)` })
    
}})

module.exports = client
const emojis = require("./utils/Config.js").emojis

import { Client, Options, Collection } from 'discord.js';

export default class LukitaClient extends Client {
  constructor() {
    super({
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
    this.commands = new Collection(),
    this.modals = new Collection(),
    this.developers = ['424931675009712128', '465859183250767882', '417067105897414667'],
    this.emotes = emojis
  }
};
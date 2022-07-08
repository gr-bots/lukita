import { emojis } from "./Config.js";

import { Client, Options, Collection } from 'discord.js';
import { Tools, Status, Games, Pallete } from './Functions.js'
import events from '../handlers/Events.js'
import commands from '../handlers/Commands.js'
import modals from '../handlers/Modals.js'
import deploy from './Deploy.js'
import database from './Database.js'
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
      intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGES"]
      });
    this.commands = new Collection(),
    this.modals = new Collection(),
    this.developers = ['424931675009712128', '431768491759239211', '465859183250767882'],
    this.emotes = emojis
    this.tools = new Tools(this)
    this.games = new Games()
    this.pallete = new Pallete()
    this.on('ready', () => {
      this.status = new Status(this)
    })
  }

  async init() { 
    await events(this)
    await commands(this)
    await modals(this)
    await database(this)
    
    await super.login(process.env.TOKEN)

    await deploy(this)
  }
};
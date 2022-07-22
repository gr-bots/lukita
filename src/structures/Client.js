
import { Client, Options, Collection, GatewayIntentBits } from 'discord.js';
import firebase from './Firebase.js'
import { emojis } from "../utils/Config.js";
import events from '../handlers/Events.js'
import commands from '../handlers/Commands.js'
import supportCommands from '../handlers/SupportCMDS.js'
import deploy from './Deploy.js'
import { success, getTime, bold } from '../utils/Logger.js'
import { Tools, Status, Games, Pallete } from '../utils/Functions.js'

export default class LukitaClient extends Client {
  constructor() {
    super({
      makeCache: Options.cacheWithLimits({
        GuildManager: Infinity,
        GuildMemberManager: Infinity,
        ApplicationCommandManager: 0,
        BaseGuildEmojiManager: 0,
        GuildBanManager: 0,
        GuildInviteManager: 0,
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
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent
      ]
    });
    this.commands = new Collection();
    this.supportCommands = new Collection();
    this.developers = ['424931675009712128', '889991365092581386', '431768491759239211', '485101049548636160'];
    this.emotes = emojis
    this.tools = new Tools(this)
    this.games = new Games()
    this.pallete = new Pallete()

    this.once('ready', () => {
      this.status = new Status(this)
    })
  }

  async init() {
    await events(this)
    await commands(this)
    await supportCommands(this)
    await firebase(this)
    await super.login(process.env.TOKEN)
    await deploy(this)

    console.log(`[ ${success('Bot')} ] ${getTime(new Date())} > ${bold(this.user.tag)} está online!`)
  }
};


import { Client, Options, Collection } from 'discord.js';
import { success, getTime, bold } from '../utils/Logger.js'
import { Tools, Status, Games, Pallete } from './Functions.js'
import { emojis } from "./Config.js";
import { config } from 'dotenv';
config()
import { promisify } from 'util';
import g from 'glob';
const glob = promisify(g);
import database from './Database.js'
import events from '../handlers/Events.js'
import commands from '../handlers/Commands.js'
import modals from '../handlers/Modals.js'

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
    this.developers = ['424931675009712128', '698880198510248006', '465859183250767882', '431768491759239211' ],
    this.emotes = emojis
    this.tools = new Tools(this)
    this.games = new Games()
    this.pallete = new Pallete()
    
    this.on('ready', () => {
      this.status = new Status(this)
    })
  }

  async init() {
    this.loadCommands()
    await events(this)
    await commands(this)
    await modals(this)
    await database(this)
    await super.login(process.env.TOKEN)

    console.log(`[ ${success('Bot')} ] ${getTime(new Date())} > ${bold(this.user.tag)} está online!`)
  }
  async loadSlashCommands() {
    console.log('[ / Slash Commands ] Atualização dos comandos iniciada...');
  
    const slashCommands = await glob(`${global.process.cwd()}/src/commands/*/*.js`)
  
    const arrayOfSlashCommands = [];
    slashCommands.map(async (value) => {
      const file = await import(value);
  
      if(!file?.name || !file.description ||!file.options) return;
  
      arrayOfSlashCommands.push(file);
    });
  
    await client.application.commands.set(arrayOfSlashCommands);
  
    console.log('[ / Slash Commands ] Atualização dos comandos concluída.');
  }
};
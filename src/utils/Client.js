
import { Client, Options, Collection } from 'discord.js';
import { success, getTime, bold } from '../utils/Logger.js'
import { Tools, Status, Games, Pallete } from './Functions.js'
import { emojis } from "./Config.js";
import { config } from 'dotenv';
config()
import { promisify } from 'util';
import glob from 'glob';
const globalPromise = promisify(glob);
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
    this.commands = new Collection();
    this.modals = new Collection();
    this.developers = ['424931675009712128', '465859183250767882', '431768491759239211', '712103766173941811'];
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
    await modals(this)
    await database(this)
    await super.login(process.env.TOKEN)
    await this.loadSlashCommands()

    console.log(`[ ${success('Bot')} ] ${getTime(new Date())} > ${bold(this.user.tag)} está online!`)
  }
  async loadSlashCommands() {
    console.log('[ / Slash Commands ] Atualização dos comandos iniciada...');

    const slashCommands = await globalPromise(`${process.cwd()}/src/commands/*/*.js`)

    const arrayOfSlashCommands = [];
    slashCommands.map(async (value) => {
      const file = await import(value);
      console.log(file.default)

      if (!file.default?.name || !file.default.description || !file.default.options) return;

      let b = arrayOfSlashCommands.push(file.defaultname);
      console.log(b)
    });
    console.log(arrayOfSlashCommands)
    await this.application.commands.set(arrayOfSlashCommands)

    console.log('[ / Slash Commands ] Atualização dos comandos concluída.');
  }
};

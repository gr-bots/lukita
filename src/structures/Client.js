
import { Client, Options, Collection, GatewayIntentBits } from 'discord.js';
import firebase from './Firebase.js';
import { emojis } from '../utils/Config.js';
import events from '../handlers/Events.js';
import commands from '../handlers/Commands.js';
import supportCommands from '../handlers/SupportCMDS.js';
import tests from '../handlers/TestCommands.js';
import deploy from './Deploy.js';
import { success, error, getTime, bold } from '../utils/Logger.js';
import { Tools, Status, Games, Pallete } from '../utils/Functions.js';
import { User, Guild, connect } from '../utils/Mongoose.js';
async function ping() {
  const pingStart = process.hrtime();
  await this.db.guild.findOne({ _id: interaction.guild.id });
  const pingStop = process.hrtime(pingStart);
  const pingDb = Math.round(((pingStop[0] * 1e9) + pingStop[1]) / 1e6);
}
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
    this.tests = new Collection();
    this.developers = ['424931675009712128', '889991365092581386', '431768491759239211', '485101049548636160'];
    this.emotes = emojis;
    this.tools = new Tools(this);
    this.games = new Games();
    this.pallete = new Pallete();
    this.db = {
      user: User,
      guild: Guild,
      ping: ping
    }
    this.once('ready', () => {
      this.status = new Status(this);
    })
  }

  async init() {
    await events(this);
    await commands(this);
    await supportCommands(this);
    await tests(this);
    await firebase(this);
    await connect(process.env.DATABASE_URL).then(() => { console.log(`[ ${success('Mongo')} ] ${getTime(new Date())} > ${bold(Mongoose)} iniciada!`) }).catch(() => {});
    await super.login(process.env.TOKEN);
    this.db.ping = async function ping() {
      const pingStart = process.hrtime();
      await this.db.guild.findOne({ _id: interaction.guild.id });
      const pingStop = process.hrtime(pingStart);
      const pingDb = Math.round(((pingStop[0] * 1e9) + pingStop[1]) / 1e6);
    }
    await deploy(this);

    console.log(`[ ${success('Bot')} ] ${getTime(new Date())} > ${bold(this.user.tag)} está online!`);
  }
};

import {
  Client as DiscordClient, GatewayIntentBits, Options, Partials, ActivityType,
} from 'discord.js';
import { EventManager } from './managers/EventManager.js';
import { CommandManager } from './managers/CommandManager.js';
import { createWinstonLogger } from './utils/Logger.js';
import database from './structures/MongoDB.js';
import { connect } from './utils/Models.js';

export class Lukita extends DiscordClient {
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
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.Channel, Partials.User, Partials.GuildMember, Partials.Message],
      failIfNotExists: false,
      allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: false,
      },
      presence: {
        status: process.env.NODE_ENV === 'development' ? 'idle' : 'online',
        activities: [{
          name: '📘› Use {/help}', type: ActivityType.Playing,
        }],
      },
    });
    this.commands = new CommandManager(this);
    this.events = new EventManager(this);
    this.dev = ['424931675009712128', '852616816240885760'];
  }

  async start() {
    this.logger = createWinstonLogger(
      {
        handleExceptions: true,
        handleRejections: true,
      },
      this,
      );
      await this.commands.loadCommands(this);
      await this.events.loadEvents();
      await super.login(process.env.BOT_TOKEN);
      await database(this);
    await connect(process.env.DATABASE_URL).then(() => { this.logger.info(`O banco de dados em MongoDB foi conectado!`, { tags: ['Database'] }); }).catch(() => {});
  }
}

import {
  Client as DiscordClient, GatewayIntentBits, Partials, ActivityType,
} from 'discord.js';
import { EventManager } from './managers/EventManager.js';
import { CommandManager } from './managers/CommandManager.js';
import { createWinstonLogger } from './utils/Logger.js';
import database from './structures/MongoDB.js';
import { connect } from './utils/Schemas.js';
import { emojis } from './utils/Config.js';
import { Pallete } from './utils/Functions.js';

export class Lukita extends DiscordClient {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.Channel, Partials.User, Partials.GuildMember, Partials.Message],
      failIfNotExists: false,
      allowedMentions: {
        parse: ['users'],
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
    this.dev = ['424931675009712128', '431768491759239211'];
    this.emj = emojis;
    this.clr = new Pallete();
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
    await super.login('OTk2MjIwMTUxMDY0MTc4NzYx.GWGBtu.C6oD3ryf7aiTSZSHqcf_c3bL8_xtUvJbtAKuB8');
    await database(this);
    await connect(process.env.DATABASE_URL).then(() => { console.log(`[ Mongo ] ${new Date()} > Mongoose iniciada!`); }).catch(() => {});
  }
}

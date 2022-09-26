import { Event } from '../structures/Event.js';

export default class Ready extends Event {
  constructor() {
    super();
    this.eventName = 'ready';
  }

  async execute(client) {
    client.logger.info('Lukita iniciado com sucesso!.', { tags: ['Bot'] });

    client.on('error', (err) => client.logger.error(err, { tags: ['Bot'] }));
    process.on('unhandledRejection', (err) => console.log(err));
    process.on('uncaughtException', (err) => console.log(err));
    /* process.on('unhandledRejection', (err) => client.logger.error(err, { tags: ['Process'] }));
    process.on('uncaughtException', (err) => client.logger.error(err, { tags: ['Process'] })); */

    await client.commands.registerCommands();
  }
}
import { readdir } from 'node:fs/promises';

export class EventManager {
  constructor(client) {
    this.client = client;
  }

  async loadEvents() {
    const events = (await readdir(`${process.cwd()}/src/events/`)).filter(file => file.endsWith('.js'));
    for await (const event of events) {
      const { default: EventClass } = await import(`${process.cwd()}/events/${event}`);
      const evt = new EventClass();
      this.client.on(evt.eventName, (...args) => evt.execute(this.client, ...args));
    }

    this.client.logger.info(`${events.length} eventos foram carregados com sucesso!`, { tags: ['Events'] });
  }
}

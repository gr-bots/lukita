import Event from '../structures/Event.js'
import { promisify } from 'util';
import glob from 'glob';
const globalPromise = promisify(glob);

export default class extends Event {
  constructor(client) {
   super(client, {
     name: 'ready'
   })
}
  async run () {
    this.client.manager?.init(client.user.id);
    const setStatus = () => {

      this.client.user.setPresence({activities: [{name: `💙› Users \{${this.client.status.users}\}・Guilds \{${this.client.status.guilds}\} `, type: "WATCHING"}], status: "idle"})

    }

    const setOtherStatus = () => {

      this.client.user.setPresence({activities: [{name: `🎈› Ping \{${Math.round(this.client.ws.ping)}ms\}`, type: "PLAYING"}], status: "idle"})

    }
    
    setStatus()
    setOtherStatus()
    setInterval(() => { setStatus(), setOtherStatus() }, 3000)


      console.log('[ / Slash Commands ] Atualização dos comandos iniciada...');
  
      const slashCommands = await globalPromise(`${process.cwd()}/src/commands/*/*.js`)
  
      const arrayOfSlashCommands = [];
      slashCommands.map(async (value) => {
        const file = import(value);
        console.log(file.default)
  
        if (!file.default?.name || !file.default.description || !file.default.options) return;
        this.client.slashCommands.set(file.name, file);
  
        arrayOfSlashCommands.push(file.default);
      });
      console.log(arrayOfSlashCommands)
      await this.application.commands.set(arrayOfSlashCommands)
  
      console.log('[ / Slash Commands ] Atualização dos comandos concluída.');
  }

}
import { Event } from '../structures/Event.js';

export default class GuildAdd extends Event {
  constructor() {
    super();
    this.eventName = 'guildAdd';
  }

  async execute(guild) {
    const { member } = interaction;
    if (guild.id === '871106497885634590') {
        let nickkontrol = member.user.username.split("")
        if (!allLetters('a', 'z').some(letter => nickkontrol.includes(letter))) {
            member.setNickname(member.user.username.replace(/([^a-z0-9 ]+)/gi, ''));
        } else {
            return;
        }

        function allLetters(charA, charZ) {
            let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
            for (; i <= j; ++i) {
                a.push(String.fromCharCode(i))
            }
            return a;
        }
    }
  }
}

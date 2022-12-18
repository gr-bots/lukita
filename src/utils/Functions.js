import moment from 'moment';
import('moment-duration-format');

// -- Connect QuizApi firebase official and create functions for set
/* class Quiz {
  constructor() {
    
  }
} */

class Pallete {
  constructor() {
    this.background = '#303136',
    this.baby = '#5d97e2',
    this.clean = '#7289da',
    this.blue = '#8aadf4',
    this.sky = '#91d7e3',
    this.green = '#a6da95',
    this.yellow = '#eed49f',
    this.orange = '#f5a97f',
    this.red = '#ed8796',
    this.pink = '#f5bde6',
    this.purple = '#c6a0f6',
    this.alert = '#e8b835',
    this.economy = {
      soft: '#e8b07d',
      green: '#599271',
    };
  }
}

class Tools {
  constructor(client, interaction) {
    this.getMember = (async function (username) {
      return await interaction.guild.members.search({ query: username, limit: 1 }).then(x => x.first().user)
    }),
    
    this.toHex = (function(d) {
      return d.toString(16);
  })

    this.randomHex = (function () {
      const hex = [new Pallete().background, new Pallete().baby, new Pallete().clean, new Pallete().blue, new Pallete().sky, new Pallete().green, new Pallete().yellow, new Pallete().orange, new Pallete().red, new Pallete().pink, new Pallete().purple];

      const random = Math.floor(Math.random() * hex.length);
      return hex[random];
    }),

    this.msToTime = (function (ms) {
      const seconds = ~~(ms / 1000);
      const minutes = ~~(seconds / 60);
      const hours = ~~(minutes / 60);
      const days = ~~(hours / 24);

      return { days, hours: hours % 24, minutes: minutes % 60, seconds: seconds % 60 };
    }),

    this.timeToMs = (function (time) {
      const timeUnits = time
        .replace(/[\d\s]/g, () => '').toLowerCase().split('');
      const formats = ['d', 'h', 'm', 's'];
      const isValid = timeUnits.length === new Set(timeUnits).size
        && timeUnits.every((u, i, a) => formats.includes(u) && formats.indexOf(a[i - 1]) < formats.indexOf(u));
      if (!isValid) return null;

      const formatted = time
        .replace(/([a-zA-Z])/g, '$1 ').toLowerCase().trim().split(' ').filter((f) => !!f);
      if (formatted.some((e) => !/[0-9]/.test(e))) return null;
      const invalid = { h: 24, m: 60, s: 60 };
      for (const f of formatted) {
        const value = f.replace(/\D/g, '');
        const unit = f.replace(/\d/gi, '');

        if (value >= invalid[unit]) return null;
      }

      const convertions = { d: 86_400_000, h: 3_600_000, m: 60_000, s: 1000 };
      return formatted.reduce(
        (acc, curr) => acc
        + parseInt(curr.substring(0, curr.length - 1))
        * convertions[curr[curr.length - 1]],
        0,
      );
    }),

    this.uptimeMS = ~~((Date.now() / 1000) - (client.uptime / 1000));

    this.uptime = (function () {
      const resultado = moment.duration(client.uptime).format('d[d], h[h], m[m], s[s]');
      return resultado;
    });
  }
}

export { Tools, Pallete };

import moment from 'moment'
import ms from 'ms'
import quiz from 'quiz-api'
import("moment-duration-format")

class Tools {
  
    constructor(client) {
            
          this.msToTime = (function (number) {
              let seconds = ms / 1000;
    const days = parseInt(seconds / 86400);
    seconds = seconds % 86400;
    const hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    const minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
  
    if (days) {
      return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
    }
    else if (hours) {
      return `${hours}h, ${minutes}m, ${seconds}s`;
    }
    else if (minutes) {
      return `${minutes}m, ${seconds}s`;
    }
    return `${seconds}s`;
          }),
            
          this.timeToMs = (function (number) {
              const timeUnits = time
      .replace(/[\d\s]/g, () => '')
      .toLowerCase()
      .split('');
    const formats = ['d', 'h', 'm', 's'];

    const isValid =
    timeUnits.length === new Set(timeUnits).size &&
    timeUnits.every((u, i, a) => formats.includes(u) && formats.indexOf(a[i - 1]) < formats.indexOf(u));
    if (!isValid) return null;

    const formatted = time
      .replace(/([a-zA-Z])/g, '$1 ')
      .toLowerCase()
      .trim()
      .split(' ')
      .filter((f) => !!f);
    if (formatted.some((e) => !/[0-9]/.test(e))) return null;

    const invalid = {
      h: 24,
      m: 60,
      s: 60
    };
    for (const f of formatted) {
      const value = f.replace(/\D/g, '');
      const unit = f.replace(/\d/gi, '');

      if (value >= invalid[unit]) return null;
    }

    const convertions = {
      d: 86_400_000,
      h: 3_600_000,
      m: 60_000,
      s: 1000
    };

    return formatted.reduce(
      (acc, curr) =>
        acc +
    parseInt(curr.substring(0, curr.length - 1)) *
    convertions[curr[curr.length - 1]],
      0
    );
          }),

          this.uptimeMS = ~~((Date.now() / 1000) - (client.uptime / 1000))
            
          this.uptime = (function () {
              let resultado = moment.duration(client.uptime).format('d[d], h[h], m[m], s[s]')
              return resultado
          })
      }
  }


class Status {
        constructor(client) {

            this.users = client.guilds.cache.map((g) => g.memberCount).reduce((b, a) => b + a).toLocaleString(),
            this.guilds = client.guilds.cache.size,
            this.channels = client.channels.cache.size

        }
    }



class Games {
        constructor() {

            this.quiz = (function (category, question) {
                return quiz(category, question) 
            })
            
        }
    }

class Pallete {
        constructor() {

            this.noBG = '#303136',
            this.primary = '#042b7b',
            this.secondary = '#200d11',
            this.blurple = '#5865F2',
            this.blueBaby = '#5d97e2',
            this.alert = '#e8b835'
            this.economy = {
              soft: "#e8b07d",
              green: "#599271"
            }

        }
    }

export {
  Pallete,
  Games,
  Status,
  Tools
}

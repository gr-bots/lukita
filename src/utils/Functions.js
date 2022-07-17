import moment from 'moment'
import ms from 'ms'
import quiz from 'quiz-api'
import("moment-duration-format")

class Tools {
  
    constructor(client) {
            
          this.msToTime = (function (number) {
              let result = moment.duration(number).format('d[d], h[h], m[m], s[s]');
              return result
          }),
            
          this.timeToMs = (function (number) {
              let result = ms(number)
              return result
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
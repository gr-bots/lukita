 class Tools {
    constructor() {
            
          this.msToTime = (function (number) {
            let moment = require("moment"); 
            require("moment-duration-format");
            let result = moment
            .duration(number)
            .format('d[d], h[h], m[m], s[s]');
            return result
          }),
            
          this.timeToMs = (function (number) {
              let result = require('ms')(number)
              return result
          }),

          this.uptimeMS = ~~((Date.now() / 1000) - (client.uptime / 1000))
            
          this.uptime = (function () {
              let moment = require("moment")
              require("moment-duration-format");
                  let resultado = moment.duration(client.uptime).format('d[d], h[h], m[m], s[s]')
              return resultado 
          })
      }
  }


class Status {
        constructor() {

            this.users = client.guilds.cache.map((g) => g.memberCount).reduce((b, a) => b + a).toLocaleString(),
            this.guilds = client.guilds.cache.size,
            this.channels = client.channels.cache.size
           

        }
    }



class Games {
        constructor() {

            this.quiz = (function (category, question) {
                let quiz = require('quiz-api')
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

        }
    }

export {
  Pallete,
  Games,
  Status,
  Tools
}
const aoifb = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
}

const emojis = {
  loading: "<a:lk_loading:979536758817570866>",
  nothing: "<:lk_nothing:979537390114844702>",
  yesCheck: "<:lk_yesCheck:979539564844679218>",
  noCheck: "<:lk_noCheck:979539483525537852>",
  user: "<:lk_user:979540126701084722>",
  hie: "<:lk_hie:979548268591743006>",
  firebase: "<:lk_Firebase:983540007304319037>",
  signal: "<:lk_signal:983540956374634496>",
  alert: "<:lk_alert:983764506121502780>",
  lighting: "<:lk_lighting:984964206132613180>",
  slash: "<:lk_slash:985985065760739339>",
  info: "<:lk_info:987500949771780116>",
  hello: "<:lk_hello:987505963017863178>",
  analytics: "<:lk_analytics:987508078918373386>",
  dev: "<:lk_dev:987544139400896532>",
  djs: "<:lk_djs:987560966797533204>",
  eco: {
    waffles: "<:lk_waffles:996411857244000326>",
    cafeteria: "<:lk_cafeteria:996413963665412207>",
    sorte: "<:lk_sorte:996412900568739860>"
  }
}

export { aoifb, emojis }
const { Collection } = require("discord.js")
const emojis = require("./utils/Config.js").emojis

module.exports = (client) => {

    client.commands = new Collection()
    client.modals = new Collection()
    client.developers = ['424931675009712128', '465859183250767882', '417067105897414667']
    client.emotes = emojis

}
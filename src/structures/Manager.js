const { Vulkava } = require('vulkava');

module.exports = (client) => {
  return new Vulkava({
    nodes: [
      {
        id: 'Safire',
        hostname: 'siesta-lavalink.herokuapp.com',
        port: 80,
        password: '124',
        region: 'USA',
        resumeKey: '124',
        resumeTimeout: 150000
      }
    ],
    sendWS: (guildId, payload) => { 
      client.guilds.cache.get(guildId)?.shard.send(payload);
  })
  .on('nodeConnect', async(node) => {
console.log(`[NODE] ${node.options.id} Conectado.`)
  })
  .on('nodeError', async(node, error) => {
console.log(`[NODE] Ocorreu um erro no node ${node.options.id} => ${error.message}`)
  })
}
import { Vulkava } from 'vulkava';

export default (client) => {
  console.log(`[ Node Manager ] ${node.options.id} Conectado..`)
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
    }
  })

  .on('nodeConnect', async(node) => {
console.log(`[ Node Manager ] ${node.options.id} Conectado!`)
  })
  .on('nodeError', async(node, error) => {
console.log(`[ Node Manager ] Ocorreu um erro no node ${node.options.id} => ${error.message}`)
  })
}
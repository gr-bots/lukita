import { Vulkava } from 'vulkava';

export default (client) => {
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
        .on("nodeConnect", node => console.log(`Node "${node.options.identifier}" conectado.`))
}
import { LavasfyClient } from 'lavasfy';

export default (client) => {

  return new LavasfyClient(
    {
      playlistPageLoadLimit: 4,
      filterAudioOnlyResult: true,
      autoResolve: true,
      useSpotifyMetadata: true,
    },
    [
      /* {
         host: "node1.kartadharta.xyz",
         port: 443,
         password: "kdlavalink",
         id: "Andrômeda",
         retryDelay: 30,
         secure: true
       },*/
      {
        id: 'Andrômeda',
        host: 'listen-spring.herokuapp.com',
        port: 80,
        secure: false,
        password: 'innovatingthewaystolisten',
        maxRetryAttempts: 300,
        resumeTimeout: 240_000,
        followRedirects: true,
        resumeKey: "resuming"
      },


    ]
  );
  this.manager = new Manager({
    plugins: [

    ],
    nodes: [
      {
        id: 'Andrômeda',
        hostname: 'listen-spring.herokuapp.com',
        port: 80,
        secure: false,
        password: 'innovatingthewaystolisten',
        maxRetryAttempts: 300,
        resumeTimeout: 240_000,
        followRedirects: true,
        resumeKey: "resuming"
      },

    ],
    send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  })


    .on('nodeConnect', async (node) => {
      console.log(`[ Node Manager ] ${node.options.id} Conectado!`)
    })
    .on('nodeError', async (node, error) => {
      console.log(`[ Node Manager ] Ocorreu um erro no node ${node.options.id} => ${error.message}`)
    })
}
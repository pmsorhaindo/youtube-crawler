// TODO spin up with yarn concurrently
const client = require('./client');
const search = require('./search');
const video = require('./video');
const channel = require('./channel');
const playlistItems = require('./playlistItems');
const kafka = require('kafka-node');

const KeyedMessage = kafka.KeyedMessage;
const scopes = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.force-ssl'
];

const kClient = new kafka.Client('localhost:2181'); 
const producer = new kafka.Producer(kClient, { requireAcks: 1 });

// Create topics sync
producer.createTopics(['channelIds','videoIds'], false, function (err, data) {
    console.log(data);
});

producer.on('ready', () => {
  client.authenticate(scopes)
    .then(() => search(client))
    .then((s) => {

      s.items.forEach(item => {
        var keyedMessage = new KeyedMessage('key1', item.id.videoId);
        producer.send([
          { topic: 'videoIds', messages: [keyedMessage] }
        ], function (err, result) {
          console.log(err || result);
          process.exit();
        });
      });
      // return video(client, 'edmyMdIxt1U');
    })
    .catch(console.log);
    
    /* .then((v) => {
      console.log('id', v.items[0].id);
      return channel(client, v.items[0].snippet.channelId);
    })
    .then((chan)=> {
      console.log('channel', chan.items[0].contentDetails.relatedPlaylists.uploads);
      return playlistItems(client, chan.items[0].contentDetails.relatedPlaylists.uploads);
    })
    .then((list) => console.log('uploaded video', list.items[0].snippet.resourceId.videoId))
    .catch(console.log); */
});

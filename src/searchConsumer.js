// TODO spin up with yarn concurrently
const client = require('./client');
const video = require('./video');
const channel = require('./channel');
const playlistItems = require('./playlistItems');
const kafka = require('kafka-node');

const topics = [{ topic: 'videoIds' }];
const options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };
const scopes = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.force-ssl'
];

const kClient = new kafka.Client('localhost:2181'); 
const consumer = new kafka.Consumer(kClient, topics, options);

let offset = new kafka.Offset(kClient);

consumer.on('message', function (message) {
  console.log(message);
});


consumer.on('error', function (err) {
  console.log('error', err);
});

/*
* If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
*/
consumer.on('offsetOutOfRange', function (topic) {
  topic.maxNum = 1;
  offset.fetch([topic], function (err, offsets) {
    if (err) {
      return console.error(err);
    }
    console.log('offsetOutOfRange received correcting!')
    var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
    consumer.setOffset(topic.topic, topic.partition, min);
  });
});

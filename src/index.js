
const client = require('./client');
const search = require('./search');
const video = require('./video');
const channel = require('./channel');
const playlistItems = require('./playlistItems');

const scopes = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.force-ssl'
];

client.authenticate(scopes)
  .then(() => search(client))
  .then((s) => {
    //console.log('search', s.items[0].id.videoId);
    return video(client, 'edmyMdIxt1U');
  })
  .then((v) => {
    console.log('id', v.items[0].id);
    return channel(client, v.items[0].snippet.channelId);
  })
  .then((chan)=> {
    console.log('channel', chan.items[0].contentDetails.relatedPlaylists.uploads);
    return playlistItems(client, chan.items[0].contentDetails.relatedPlaylists.uploads);
  })
  .then((list) => console.log('uploaded video', list.items[0].snippet.resourceId.videoId))
  .catch(console.log);

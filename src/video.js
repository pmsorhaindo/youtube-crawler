'use strict';

const { google } = require('googleapis');

// a very simple example of searching for youtube videos
async function makeRequest (client, id) {
  const youtube = google.youtube({
    version: 'v3',
    auth: client.oAuth2Client
  });

  const res = await youtube.videos.list({
    id,
    part: 'id,snippet,statistics',
  });
  
  return res.data;
}

module.exports = makeRequest;
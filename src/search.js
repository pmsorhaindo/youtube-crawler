'use strict';

const { google } = require('googleapis');

// a very simple example of searching for youtube videos
async function makeRequest (client, query) {
  const youtube = google.youtube({
    version: 'v3',
    auth: client.oAuth2Client
  });

  const res = await youtube.search.list({
    maxResults: '25',
    part: 'id,snippet',
    q: query
  });

  return res.data;
}

module.exports = makeRequest;
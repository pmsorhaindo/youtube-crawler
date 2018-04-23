'use strict';

const { google } = require('googleapis');

async function makeRequest (client, playlistId) {
  const youtube = google.youtube({
    version: 'v3',
    auth: client.oAuth2Client
  });

  const res = await youtube.playlistItems.list({
    playlistId,
    part: 'snippet',
    maxResults: 25,
  });

  return res.data;
}

module.exports = makeRequest;
'use strict';

const { google } = require('googleapis');

async function makeRequest (client, id) {
  const youtube = google.youtube({
    version: 'v3',
    auth: client.oAuth2Client
  });

  const res = await youtube.channels.list({
    id,
    part: 'id,snippet,statistics,contentDetails',
  });

  return res.data;
}

module.exports = makeRequest;
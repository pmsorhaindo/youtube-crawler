'use strict';

const { google } = require('googleapis');

async function makeRequest (client, videoId) {
  const youtube = google.youtube({
    version: 'v3',
    auth: client.oAuth2Client
  });

  const res = await youtube.commentThreads.list({
    videoId,
    part: 'id,snippet,replies',
  });
  console.log(res.data.items[1].snippet);
}

module.exports = makeRequest;
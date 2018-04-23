'use strict';

const { google } = require('googleapis');

async function makeRequest (client, id) {
  const youtube = google.youtube({
    version: 'v3',
    auth: client.oAuth2Client
  });

  const res = await youtube.comments.list({
    id,
    part: 'id,snippet',
  });
  console.log(res.data.items[0].snippet);
}

module.exports = makeRequest;
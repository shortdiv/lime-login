const parseURL = require("url-parse");
const cookie = require("cookie");

exports.handler = function(event, context, callback) {
  const params = event.queryStringParameters;
  const urlData = parseURL(params.site);
  const redirectBaseUrl = urlData.origin;

  const { headers } = event;
  const cookieHeader = headers.cookie || "";
  const cookies = cookie.parse(cookieHeader);

  callback(null, {
    statusCode: 302,
    headers: {
      "Set-Cookie": cookies.nf_jwt,
      Location: `${redirectBaseUrl}/.netlify/functions/read-cookie?cookie=${
        cookies.nf_jwt
      }`,
      "Cache-Control": "no-cache"
    },
    body: JSON.stringify({ cookie: cookies.nf_jwt })
  });
};

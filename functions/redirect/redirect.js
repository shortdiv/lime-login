const parseURL = require("url-parse");
const cookie = require("cookie");

exports.handler = function(event, context, callback) {
  const params = event.queryStringParameters;
  const urlData = parseURL(params.site);
  const redirectBaseUrl = urlData.origin;

  const { headers } = event;
  const cookieHeader = headers.cookie || "";
  const cookies = cookie.parse(cookieHeader);

  // for some reason nf_jwt is duplicated, one with null another with val, this removes the dup //
  const headerCookies = headers.cookie.split(";");
  let headerz = "";
  for (var i = 0; i < headerCookies.length; i++) {
    if (headerCookies[i].split("=")[1] !== "null") {
      headerz += headerCookies[i] + ";";
    }
  }

  const parsecookie = cookie.parse(headerz);

  callback(null, {
    statusCode: 200,
    headers: {
      Location: `${redirectBaseUrl}/.netlify/functions/read-cookie?cookie=${
        parsecookie.nf_jwt
      }`,
      "Cache-Control": "no-cache"
    },
    body: JSON.stringify({ cookie: cookies, parsed: parsecookie.nf_jwt })
  });
};

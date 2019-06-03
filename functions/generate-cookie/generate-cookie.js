const cookie = require("cookie");

exports.handler = function(event, context, callback) {
  const { token } = JSON.parse(event.body);

  const netlifyCookie = cookie.serialize("nf_jwt", token.access_token, {
    secure: true,
    path: "/",
    expires: new Date(token.expires_at)
  });

  callback(null, {
    statusCode: 200,
    headers: {
      "Set-Cookie": netlifyCookie,
      "Cache-Control": "no-cache",
      "Content-Type": "text/html"
    },
    body: JSON.stringify({ token })
  });
};

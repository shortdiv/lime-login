const cookie = require("cookie");

exports.handler = function(event, context, callback) {
  const { jwt } = JSON.parse(event.body);

  const netlifyCookie = cookie.serialize("nf_jwt", jwt);

  callback(null, {
    statusCode: 200,
    headers: {
      "Set-Cookie": netlifyCookie,
      "Cache-Control": "no-cache",
      "Content-Type": "text/html"
    },
    body: JSON.stringify({ jwt })
  });
};

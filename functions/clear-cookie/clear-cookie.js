const cookie = require("cookie");

exports.handler = function(event, context, callback) {
  const netlifyCookie = cookie.serialize("nf_jwt", null);

  callback(null, {
    statusCode: 200,
    headers: {
      "Set-Cookie": netlifyCookie,
      "Cache-Control": "no-cache",
      "Content-Type": "text/html"
    },
    body: JSON.stringify({ msg: "deleted!" })
  });
};

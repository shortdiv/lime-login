exports.handler = function(event, context, callback) {
  const { user } = context.clientContext;

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ user })
  });
};

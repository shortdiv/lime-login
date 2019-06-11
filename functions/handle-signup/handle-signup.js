exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  const { user } = data;

  const responseBody = {
    app_metadata: {
      ...user.app_metadata,
      authorization: {
        roles: ["Apple", "apple"]
      }
    },
    user_metadata: {
      ...user.user_metadata,
      custom_data_from_function: "hurray this is some extra metadata"
    }
  };
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(responseBody)
  });
};

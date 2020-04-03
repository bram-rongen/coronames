const validators = require("../utils/validators");

function parseJson(message, schema, defaultValue) {
  try {
    data = JSON.parse(message);
    if (validators.validate(schema, data)) {
      return data;
    }
  } catch (e) {}

  return defaultValue;
}

module.exports = parseJson;

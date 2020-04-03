const Ajv = require("ajv");
const ajv = new Ajv();

ajv.addSchema(
  {
    type: "string",
    format: "uuid"
  },
  "identify"
);
ajv.addSchema(
  {
    action: {
      type: "string"
    }
  },
  "message"
);
ajv.addSchema(
  {
    type: "string"
  },
  "action_joinGame"
);
ajv.addSchema(
  {
    type: "string"
  },
  "action_adminAuth"
);
ajv.addSchema(
  {
    type: "string"
  },
  "action_setName"
);
ajv.addSchema(
  {
    type: "integer",
    min: 0,
    max: 24
  },
  "action_makeMove"
);
ajv.addSchema(
  {
    type: "object",
    additionalProperties: false
  },
  "action_skipTurn"
);
ajv.addSchema(
  {
    type: "object",
    properties: {
      spymasters: {
        type: "array",
        items: {
          type: "string",
          format: "uuid"
        }
      }
    },
    additionalProperties: false
  },
  "action_newGame"
);
ajv.addSchema(
  {
    type: "string",
    format: "uuid"
  },
  "action_toggleSpyMaster"
);

module.exports = ajv;

import { Entity } from "electrodb"; // ORM - object relational mapping
import { client } from "../util/dbconnection.js";

const user = new Entity(
  {
    model: {
      entity: "User",
      version: "2",
      service: "UserService",
    },
    attributes: {
      username: {
        type: "string",
      },
      password: {
        type: "string",
      },
      roleId: {
        type: "number",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          // highlight-next-line
          field: "pk",
          facets: ["username"],
        },
        sk: {
          // highlight-next-line
          field: "sk",
          facets: [],
        },
      },
    },
  },
  { client, table: "user" }
);

export { user };

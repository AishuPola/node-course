import { Entity } from "electrodb";
import { client } from "../util/dbconnections.js"; // Your DynamoDB client configuration

const Cart = new Entity(
  {
    model: {
      entity: "Cart",
      version: "1",
      service: "CartService",
    },
    attributes: {
      username: {
        type: "string",
        required: true,
      },
      courses: {
        type: "list",
        items: {
          type: "map",
          properties: {
            courseId: {
              type: "string",
              required: true,
            },
            price: {
              type: "number",
              required: true,
            },
          },
        },
        required: true,
      },
      totalPrice: {
        type: "number",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          facets: ["username"],
        },
        sk: {
          field: "sk",
          facets: [],
        },
      },
    },
  },
  { client, table: "CartTable" } // Replace with your DynamoDB table name
);

export { Cart };

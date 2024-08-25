import { Entity } from "electrodb"; // ORM(Object relation mapping) // Adapter on adapter

import { client } from "../util/dbconnection.js";

const Courses = new Entity(
  {
    model: {
      entity: "Courses",
      version: "1",
      service: "courseService",
    },
    attributes: {
      id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      price: {
        type: "number",
      },
      category: {
        type: "string",
      },
      rating: {
        type: "string",
      },

      instructor: {
        type: "string",
      },

      description: {
        type: "string",
      },
      course_img: {
        type: "string",
      },
      course_video: {
        type: "string",
      },
    },
    indexes: {
      primary: {
        pk: {
          // highlight-next-line
          field: "pk",
          facets: ["id"],
        },
        sk: {
          // highlight-next-line
          field: "sk",
          facets: [],
        },
      },
    },
  },
  { client, table: "Courses" }
);

export { Courses };

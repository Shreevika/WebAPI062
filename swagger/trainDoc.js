module.exports = {
  "/train/trainList": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Trains"],
      summary: "Get all trains",
      description: "Get all trains list",
      responses: {
        200: {
          description: "Trains list fetched successfully.",
        },
        400: {
          description: "errors to show in front end",
        },
        401: {
          description: "Token not provided or Expired",
        },
        500: {
          description: "server error try agin in a couple of mins",
        },
      },
    },
  },
  "/train": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Trains"],
      summary: "Get train by id",
      description: "Get train location by id",
      parameters: [
        {
          name: "trainId",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "TrainId",
        },
      ],
      responses: {
        200: {
          description: "Train fetched successfully.",
        },
        400: {
          description: "errors to show in front end",
        },
        401: {
          description: "Token not provided or Expired",
        },
        500: {
          description: "server error try agin in a couple of mins",
        },
      },
    },
  },
  "/train/getAll": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ["Trains"],
      summary: "Get all trains locations",
      description: "Get all trains real time locations",
      responses: {
        200: {
          description: "Trains location fetched successfully.",
        },
        400: {
          description: "errors to show in front end",
        },
        401: {
          description: "Token not provided or Expired",
        },
        500: {
          description: "server error try agin in a couple of mins",
        },
      },
    },
  },
};

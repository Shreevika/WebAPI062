const authDoc = require("./authDoc");
const trainDoc = require("./trainDoc");

module.exports = {
  openapi: "3.0.3",
  info: {
    title: "TRTL - Backend",
    description: "Back-End API endpoints for Train Real Time Tracking App",
    termsOfService: "http://swagger.io/terms/",
    contact: {
      email: "k.m.g.shreevika@gmail.com",
    },
  },
  servers: [
    {
      url: "/api/v1",
    },
  ],
  paths: {
    ...authDoc,
    ...trainDoc,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [[]],
};

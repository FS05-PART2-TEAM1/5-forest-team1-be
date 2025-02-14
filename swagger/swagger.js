import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TEAM1 : 공부의 숲",
      description: "공부의 숲 RESTful API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}/`,
        description: "Local Development",
      },
      {
        url: "http://test.co.kr/",
        description: "Test Server",
      },
      {
        url: "http://real.co.kr/",
        description: "Real Server",
      },
    ],
    // components: {},
  },
  apis: ["./router/**/*.js", "./swagger/*"],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };

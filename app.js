import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/index.js";
import prisma from "./prismaClient.js";
import { swaggerUi, specs } from "./swagger/swagger.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

prisma
  .$connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

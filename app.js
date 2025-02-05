import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/index.js";
import prisma from "./prismaClient.js";
dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "http://127.0.0.1:5174",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
  ],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  if (req.url === "/favicon.ico") {
    res.status(204).end(); // No content
  } else {
    next();
  }
});

app.use("/api", router);

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

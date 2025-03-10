import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/index.js";
import prisma from "./prismaClient.js";
import { createServer } from "http"; // HTTP 서버 생성
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    //origin: "https://sprint-forest-fe.netlify.app",
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    // credentials: true,
    // allowedHeaders: ["Content-Type"],
  },
});
app.use(express.json());
app.use("/api", router);

prisma
  .$connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Socket.io 이벤트 처리
// io.on("connection", (socket) => {
//   console.log("🟢 클라이언트 연결됨:", socket.id);

//   socket.on("lalala", (data) => {
//     console.log("lalala옴", data);
//   });

//   socket.on("disconnect", () => {
//     console.log(`❌ 클라이언트 연결 해제: ${socket.id}`);
//   });
// });
io.on("connection", (socket) => {
  socket.on("newuser", (username) => {
    socket.broadcast.emit("update", `${username} 님이 채팅에 접속했습니다.`);
  });

  socket.on("exituser", (username) => {
    socket.broadcast.emit("update", `${username} 님이 채팅을 나갔습니다.`);
  });

  socket.on("chat", (message) => {
    socket.broadcast.emit("chat", message);
  });
});
//
// Socket.io가 Express와 함께 실행되도록 설정
app.get("/public/chatroom", (req, res) => {
  res.send("Socket.io is running");
});

// 정적 파일 제공 (채팅 페이지 경로)
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public", "chatroom")));
// const PORT = 8000;
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // console.log(`WebSocket 서버 실행 중: ws://localhost:${socketPort}`);
});

export default app;

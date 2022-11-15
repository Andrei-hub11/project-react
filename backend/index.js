const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const contatosRoutes = require("./router/contatosRoutes");

const bodyParser = require("body-parser");

dotenv.config();

const PORT = process.env.PORT || 8800;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/v1/contatos", contatosRoutes);

app.listen(PORT, () => {
  console.log(`Escutando na porta na porta ${PORT}`);
});

const http = require("http");
const server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-type": "text/plain" });
  response.end("Hello World!");
}); // <-----------
server.listen(5000);
console.log("ola");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

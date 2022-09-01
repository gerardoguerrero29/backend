/* -------------Modulos------------- */
const express = require("express");
const path = require("path");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

/* -------------Instancia de Server------------- */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
/* -------------Middlewares------------- */

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------Rutas------------- */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("*", (req, res) => {
  res.send("404 - Page not Found");
});
/* -------------BBDD------------- */
const DB_MENSAJES = [
  { author: "juan", text: "hola que tal" },
  { author: "pedro", text: "muy bien, vos?" },
  { author: "ana", text: "Genial" },
];
/* -------------Servidor------------- */
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`servidor escuchando en http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.error(`error en el servidor ${err}`);
});

/* -------------WebSocket------------- */
io.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);
  socket.emit("from-server-mensajes", DB_MENSAJES);
  socket.on("from-client-mensaje", (msj) => {
    DB_MENSAJES.push(msj);
    io.sockets.emit("from-server-mensajes", DB_MENSAJES);
  });
});

/* -------------Modulos------------- */
const { urlencoded } = require("express");
const express = require("express");
const exprhbs = require("express-handlebars");
const path = require("path");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const routerProductos = require("./routes/productos.routes.js");
const routerCarrito = require("./routes/carrito.routes.js");

/* -------------Instancia de Server------------- */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/* -------------Middlewares------------- */

app.engine(
  "hbs",
  exprhbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: "hbs",
  })
);
app.use(express.static(__dirname + "/public"));
app.use(urlencoded({ extended: true }));
app.use(express.json());

//motor de plantillas
app.set("views", "./views");
app.set("view engine", "hbs");

/* -------------Rutas------------- */

app.get("/", (req, res) => {
  res.render("vista");
});

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.get("*", (require, response) => {
  response.send("404 - Page not Found");
});

/* -------------Servidor------------- */
const port = 8080;
const server = httpServer.listen(port, () => {
  console.log(`servidor escuchando en http://localhost:${port}`);
});

server.on("error", (err) => {
  console.error(`error en el servidor ${err}`);
});

/* -------------WebSocket------------- */
io.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);
  socket.emit("from-server-mensajes", DB_MENSAJES);
  socket.emit("from-server-productos", DB_PRODUCTOS);

  socket.on("from-client-mensaje", (msj) => {
    DB_MENSAJES.push(msj);
    io.sockets.emit("from-server-mensajes", DB_MENSAJES);
  });

  socket.on("from-client-producto", (producto) => {
    DB_PRODUCTOS.push(producto);
    io.sockets.emit("from-server-productos", DB_PRODUCTOS);
  });
});

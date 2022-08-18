/* -------------Modulos------------- */
const express = require("express");
const morgan = require("morgan");

/* -------------Instancia de Server------------- */
const app = express();
const routerProductos = require("./src/productos.routes.js");

/* -------------Middlewares------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

/* -------------Rutas------------- */

app.get("/", (req, res) => {
  res.send(
    "Hola coders, esta es la pagina principal, directamente desde la app"
  );
});

app.use("/api/productos", routerProductos);

app.get("*", (require, response) => {
  response.send("404 - Page not Found");
});

/* -------------Servidor------------- */
const port = 8080;
const server = app.listen(port, () => {
  console.log(`servidor escuchando en http://localhost:${port}`);
});

server.on("error", (err) => {
  console.error(`error en el servidor ${err}`);
});

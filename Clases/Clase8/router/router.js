/* -------------Modulos------------- */
const express = require("express");
const { Router } = express;
const morgan = require("morgan");

/* -------------Instancia de Server------------- */
const app = express();

/* -------------Middlewares------------- */

app.use(express.json());
app.use(morgan("dev"));

/* -------------Segmentos de rutas------------- */
const router1 = Router();

/* -------------Rutas------------- */

app.get("/", (req, res) => {
  res.send("Hola coders");
});

router1.get("/recurso1", (req, res) => {
  res.send("hola coders, este es segmento 1");
});

app.use("/api/router1/", router1);

/* -------------Servidor------------- */
const port = 8080;
const server = app.listen(port, () => {
  console.log(`servidor escuchando en ${port}`);
});

server.on("error", (err) => {
  console.error(`error en el servidor ${err}`);
});

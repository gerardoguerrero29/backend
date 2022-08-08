const express = require("express");
const Productos = require("./Productos.js");

const app = express();

const prod = new Productos(`./data.json`);

app.get("/", (require, response) => {
  response.send(
    "Bienvenidos, servidor iniciado con express - Para probar utilice las dos posibles rutas: /productos o /productoRandom "
  );
});

app.get("/productos", (require, response) => {
  response.send(console.log("All:",prod.getAll()));
});

app.get("/productoRandom", (require, response) => {
  response.send(console.log("Random:",prod.getRandom(1, 3)));
});

app.get("*", (require, response) => {
  response.send("404 - Page not Found");
});

const server = app.listen(8080, () => {
  console.log("Servidor escuchando en http://localhost:8080/");
});

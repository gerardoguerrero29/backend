const express = require(`express`);

const app = express();
const frase = "hola coders como estan";

app.get("/api/frase", (req, res) => {
  res.status(200).send(frase);
});

app.get("/api/letras/:num", (req, res) => {
  const num = parseInt(req.params.num);

  if (isNaN(num)) {
    return res.send({ error: "el parametro ingresado no es un numero" });
  }

  if (num < 1 || num > frase.length) {
    return res.send({ error: "el parametro esta fuera de rango" });
  }

  res.status(200).send(frase[num - 1]);
});

app.get("/api/palabras/:num", (req, res) => {
  let palabras = frase.split(" ");
  const num = parseInt(req.params.num);

  if (isNaN(num)) {
    return res.send({ error: "el parametro ingresado no es un numero" });
  }

  if (num < 1 || num > palabras.length) {
    return res.send({ error: "el parametro esta fuera de rango" });
  }

  res.status(200).send(palabras[num - 1]);
});

app.get("*", (req, res) => {
  res.status(404).json({
    code: 404,
    msg: "not found",
  });
});

const port = 8080;
const server = app.listen(port, () => {
  console.log(`servidor escuchando en el puerto ${server.address().port}`);
});

server.on("error", (err) => {
  console.log(`Error en el servidor ${err}`);
});

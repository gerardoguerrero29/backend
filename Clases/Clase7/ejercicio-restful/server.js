const express = require("express");
const app = express();

app.get("*", (req, res) => {
  res.status(404).json({
    code: 404,
    msj: "not found",
  });
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`servidor iniciado en el puerto ${server.address().port}`);
});

server.on("error", (er) => console.log("error en el servidor", er));

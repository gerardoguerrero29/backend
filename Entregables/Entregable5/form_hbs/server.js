/* -------------Modulos------------- */
const { urlencoded } = require("express");
const express = require("express");

/* -------------Instancia de Server------------- */
const app = express();

/* -------------Middlewares------------- */

app.use(express.static(__dirname + "/public"));
app.use(urlencoded({extended: true}))

//motor de plantillas
app.set("views", "./views");
app.set("view engine", "hbs");

//Base de datos
const DB_PRODUCTOS=[
    {
        "nombre": "Ferrari",
        "precio": 300000,
        "foto": "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/U5NQT2GDRBGUFFCG66U7TC4QZE.jpg"
      },
      {
        "nombre": "Lamborghini",
        "precio": 250000,
        "foto": "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/financial/2021/landing/over/lfs_landing_rev_over_01_m.jpg"
      },
      {
        "nombre": "Porsche",
        "precio": 270000,
        "foto": "https://www.diariomotor.com/imagenes/picscache/750x/brabus-porsche-taycan-2022-04-6285217be0dfc_750x.jpg"
      }
]

/* -------------Rutas------------- */

app.get("/", (req, res) => {
  res.render("vista", {DB_PRODUCTOS});
});

app.post("/productos", (req, res) => {
    DB_PRODUCTOS.push(req.body)
    console.log(DB_PRODUCTOS)
    res.redirect("/")
  });

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

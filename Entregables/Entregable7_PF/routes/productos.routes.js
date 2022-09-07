/* -------------Modulos------------- */
const express = require("express");
const Container = require("../public/js/Container");

/* -------------Middlewares------------- */
const routerProducto = express.Router();
const productoApi = new Container("../Entregable7_PF/DB/DB_PRODUCTOS.json");
const admin = true;

/* -------------Rutas------------- */
routerProducto.get("/", async (req, res) => {
  res.json(await productoApi.getAll());
});

routerProducto.get("/:id", async (req, res) => {
  let id = req.params.id;
  res.json(await productoApi.getById(id));
});

routerProducto.post("/", async (req, res) => {
  if (admin) {
    let producto = req.body;
    res.json(await productoApi.save(producto));
  } else {
    res.json({
      error: 403,
      description: `ruta /producto metodo Post no autorizado`,
    });
  }
});

routerProducto.put("/:id", async (req, res) => {
  let id = req.params.id;
  let producto = req.body;

  if (admin) {
    res.json(await productoApi.update(producto, id));
  } else {
    res.json({
      error: 403,
      description: `ruta /producto/:id metodo put no autorizado`,
    });
  }
});

routerProducto.delete("/:id", async (req, res) => {
  let id = req.params.id;
  if (admin) {
    res.json(await productoApi.deleteId(id));
  } else {
    res.json({
      error: 403,
      description: `ruta /producto/:id metodo delete no autorizado`,
    });
  }
});

/* -------------Export------------- */

module.exports = routerProducto;

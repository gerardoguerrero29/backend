/* -------------Modulos------------- */
const express = require("express");
const Container = require("../public/js/Container");

/* -------------Middlewares------------- */
const routerCarrito = express.Router();
const carritoApi = new Container("../Entregable7_PF/DB/DB_CARRITO.json");
const productoApi = new Container("../Entregable7_PF/DB/DB_PRODUCTOS.json");

const admin = true;

/* -------------Rutas------------- */

routerCarrito.get("/:id/productos", async (req, res) => {
  let id = req.params.id;
  res.json(await carritoApi.getById(id));
});

routerCarrito.post("/", async (req, res) => {
  if (admin) {
    res.json(await carritoApi.save({ products: [] }));
  } else {
    res.json({
      error: 403,
      description: `ruta /carrito metodo Post no autorizado`,
    });
  }
});

routerCarrito.delete("/:id", async (req, res) => {
  let id = req.params.id;
  if (admin) {
    res.json(await carritoApi.deleteId(id));
  } else {
    res.json({
      error: 403,
      description: `ruta /carrito/:id metodo delete no autorizado`,
    });
  }
});

routerCarrito.post("/:id/productos", async (req, res) => {
  let idProducto = req.body;
  let producto = await productoApi.getById(idProducto.id);

  let idCarrito = req.params.id;
  let carrito = await carritoApi.getById(idCarrito);

  if (admin) {
    carrito.products.push(producto);
    res.json(await carritoApi.update(carrito, idCarrito));
  } else {
    res.json({
      error: 403,
      description: `ruta /carrito/:id/productos metodo post no autorizado`,
    });
  }
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  const idProducto = req.params.id_prod;
  const idCarrito = req.params.id;
  const carrito = await carritoApi.getById(idCarrito);

  if (admin) {
    const index = carrito.products.findIndex((o) => o.id == idProducto);
    if (index == -1) {
      res.json({
        code: 404,
        msj: `Producto ID: ${idProducto} no se encuentra en el carrito ${idCarrito}`,
      });
    } else {
      carrito.products.splice(index, 1);
      res.json(await carritoApi.update(carrito, idCarrito));
    }
  } else {
    res.json({
      error: 403,
      description: `ruta /carrito/:id/productos/:id_prod metodo delete no autorizado`,
    });
  }
});

/* -------------Export------------- */

module.exports = routerCarrito;

/* -------------Modulos------------- */
const express = require("express");
const routerProductos = express.Router();

/* -------------DB------------- */

let DB_PRODUCTOS = [
  {
    id: 1,
    title: "Ferrari",
    price: 300000,
    thumbnail:
      "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/U5NQT2GDRBGUFFCG66U7TC4QZE.jpg",
  },
  {
    id: 2,
    title: "Lamborghini",
    price: 250000,
    thumbnail:
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/financial/2021/landing/over/lfs_landing_rev_over_01_m.jpg",
  },
];

/* -------------Rutas------------- */

routerProductos.get("/", (req, res) => {
  res.status(200).json(DB_PRODUCTOS);
});

routerProductos.get("/:id", (req, res) => {
  const id = req.params.id;
  const indexProd = DB_PRODUCTOS.findIndex((prod) => prod.id == id);

  indexProd == -1
    ? res
        .status(404)
        .json({ code: 404, msj: `Producto ID: ${id} no se encuentra` })
    : res.status(200).json(DB_PRODUCTOS[indexProd]);
});

routerProductos.post("/", (req, res) => {
  let newId =
    DB_PRODUCTOS.length === 0
      ? 1
      : DB_PRODUCTOS[DB_PRODUCTOS.length - 1].id + 1;
  console.log("objeto a guardar:", req.body, "newID: ", newId);

  let newObj = { id: newId, ...req.body };

  DB_PRODUCTOS.push(newObj);
  res
    .status(201)
    .json({ msj: "agregado exitosamente en el ID:" + newId, data: req.body });
});

routerProductos.delete("/:id", (req, res) => {
  let id = req.params.id;
  if (DB_PRODUCTOS.some((obj) => obj.id == id)) {
    let dbFiltererd = DB_PRODUCTOS.filter((obj) => obj.id != id);
    DB_PRODUCTOS = dbFiltererd;
    res.status(201).json({
      msj: "ID: " + id + " Eliminado exitosamente",
      data: DB_PRODUCTOS,
    });
  } else {
    res.status(400).json({ msj: "ID: " + id + " No existe" });
  }
});

routerProductos.put("/:id", (req, res) => {
  let id = req.params.id;
  const { title, price, thumbnail } = req.body;
  if (DB_PRODUCTOS.some((obj) => obj.id == id)) {
    DB_PRODUCTOS[id-1].title = title;
    DB_PRODUCTOS[id-1].price = price;
    DB_PRODUCTOS[id-1].thumbnail = thumbnail;
    res
      .status(201)
      .json({ msj: "ID: " + id + " modificado satisfactoriamente" });
  } else {
    res.status(400).json({ msj: "ID: " + id + " No existe" });
  }
});

/* -------------Export------------- */

module.exports = routerProductos;

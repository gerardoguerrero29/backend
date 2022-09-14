import { ContenedorSQL } from "./src/container/ContenedorSQL.js";
import { configMsj, configProducts } from "./src/utils/config.js";

const apiMensajes = new ContenedorSQL("mensajes", configMsj);
const apiProductos = new ContenedorSQL("productos", configProducts);

async function main() {
  const listaMensajes = [
    { author: "Gerardo", date: "fecha 1", text: "hola como estas" },
    { author: "Hector", date: "fecha 2", text: "todo bien y vos?" },
    { author: "Pedro", date: "fecha 3", text: "hola muchachos, recien llego" },
  ];

  const listaProductos = [
    {
      nombre: "Ferrari",
      precio: 300000,
      foto: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/U5NQT2GDRBGUFFCG66U7TC4QZE.jpg",
    },
    {
      nombre: "Lamborghini",
      precio: 250000,
      foto: "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/financial/2021/landing/over/lfs_landing_rev_over_01_m.jpg",
    },
    {
      nombre: "Porsche",
      precio: 270000,
      foto: "https://www.diariomotor.com/imagenes/picscache/750x/brabus-porsche-taycan-2022-04-6285217be0dfc_750x.jpg",
    },
  ];

  let res;

  // 1) inserto en BBDD
  res = await apiProductos.insertar(listaProductos);
  console.log("inserta en tabla: ", res);

  // 2) listo la BBDD
  res = await apiProductos.listarAll();
  console.log("recupera los registros: ", res);

  // 3) listo un id especifico
  res = await apiProductos.listar(2);
  console.log(`recupera el id 2: `, res);

  // 4) modifico un id especifico
  res = await apiProductos.actualizar(2, {
    nombre: "honda",
    precio: 999999,
    foto: "foto modificada",
  });
  console.log(`modifico el id 2: `, res);

  // 5) listo la BBDD
  res = await apiProductos.listarAll();
  console.log("recupera los registros: ", res);

  // 6) Elimino un id especifico
  res = await apiProductos.eliminar(1);
  console.log(`Elimino el id 1: `, res);

  // 7) listo la BBDD
  res = await apiProductos.listarAll();
  console.log("recupera los registros: ", res);

  // finaliza la conexion
  await apiProductos.cerrarConexion();
}
main();

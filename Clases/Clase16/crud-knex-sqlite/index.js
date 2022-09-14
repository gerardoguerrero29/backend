import { ContenedorSQL } from "./src/container/ContenedorSQL.js";

const apiAutos = new ContenedorSQL("autos");

async function main() {
  const listaAutos = [
    { marca: "toyota", modelo: "rav4" },
    { marca: "volkswagen", modelo: "golf" },
    { marca: "ford", modelo: "focus" },
  ];

  let res;

  // 1) inserto en BBDD
  res = await apiAutos.insertar(listaAutos);
  console.log("inserta en tabla: ", res);

  // 2) listo la BBDD
  res = await apiAutos.listarAll();
  console.log("recupera los registros: ", res);

  // 3) listo un id especifico
  res = await apiAutos.listar(2);
  console.log(`recupera el id 2: `, res);

  // 4) modifico un id especifico
  res = await apiAutos.actualizar(2, { marca: "honda", modelo: "CR-V" });
  console.log(`modifico el id 2: `, res);

  // 5) listo la BBDD
  res = await apiAutos.listarAll();
  console.log("recupera los registros: ", res);

  // 6) Elimino un id especifico
  res = await apiAutos.eliminar(4);
  console.log(`Elimino el id 4: `, res);

  // 7) listo la BBDD
  res = await apiAutos.listarAll();
  console.log("recupera los registros: ", res);

  // finaliza la conexion
  await apiAutos.cerrarConexion();
}
main();

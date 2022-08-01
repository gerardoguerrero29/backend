const fs = require("fs");

class Container {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async save(obj) {
    const listado = await this.getAll();
    let newId =
      listado.length === 0 ? 1 : listado[listado.length - 1].id + 1;
    return `se guardo exitosamente --> ID ${newId}`;
  }
  getById(id) {
    return "se imprimio";
  }
  async getAll() {
    try {
      const objs = await fs.promises.readFile(this.ruta, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      return error;
    }
  }
  deleteById(id) {
    return "se elimino";
  }
  deleteAll() {
    return "se elimino todo";
  }
}

async function main() {
  const product = new Container(
    `../Backend/Entregables/Entregable2/containerData.json`
  );
  console.log("ruta:", product.ruta);
  console.log(await product.save());
  console.log(product.getById());
  console.log(await product.getAll());
  console.log(product.deleteById());
  console.log(product.deleteAll());
}

main();

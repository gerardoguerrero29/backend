const fs = require("fs");

class Container {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async getAll() {
    try {
      const objs = await fs.promises.readFile(this.ruta, "utf-8");
      return objs == [] ? [] : JSON.parse(objs);
    } catch (error) {
      return error;
    }
  }
  async getRandom(min, max) {
    let id = Math.floor(Math.random() * max + min);
    try {
      let listado = await this.getAll();
      listado = listado.filter((list) => list.id === id);
      return listado === [] ? null : listado;
    } catch (error) {
      console.log(error);
    }
  }
}

/* async function main() {
  const product = new Container(`../Backend/Entregables/Entregable3/Data.json`);

  console.log(await product.getAll()); // imprimo toda la lista
  console.log(await product.getById(1)); //imprimo solo el ID 1
  console.log(await product.deleteById(2)); //Elimino el ID 2
  console.log(await product.getAll()); // imprimo toda la lista para verificar que el ID 2 haya sido borrado
} */

module.exports = Container;

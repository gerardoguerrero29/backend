const fs = require("fs");

class Container {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async save(obj) {
    try {
      const listado = await this.getAll();
      let newId = listado.length === 0 ? 1 : listado[listado.length - 1].id + 1;
      obj = { id: newId, ...obj };
      listado.push(obj);
      await fs.promises.writeFile(this.ruta, JSON.stringify(listado));
      return `se guardo exitosamente --> ID ${newId}`;
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const objs = await fs.promises.readFile(this.ruta, "utf-8");
      return objs == [] ? [] : JSON.parse(objs);
    } catch (error) {
      return error;
    }
  }
  async getById(id) {
    try {
      let listado = await this.getAll();
      listado = listado.filter((list) => list.id === id);
      return listado === [] ? null : listado;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      let listado = await this.getAll();
      if (listado.some((list) => list.id === id)) {
        listado = listado.filter((list) => list.id != id);
        await fs.promises.writeFile(this.ruta, JSON.stringify(listado));
        return `ID: ${id} eliminado Exitosamente`;
      } else {
        return `ID: ${id} No existe`;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      let listado = [];
      await fs.promises.writeFile(this.ruta, listado);
      return `Todo eliminado Exitosamente`;
    } catch (error) {
      console.log(error);
    }
  }
}

async function main() {
  let ObjPrueba = {
    title: "auto de prueba",
    price: 100000,
    thumbnail: "foto de prueba",
  };

  const product = new Container(
    `../Backend/Entregables/Entregable2/containerData.json`
  );

  console.log(await product.save(ObjPrueba)); //Guardo un objeto de prueba con ID 4
  console.log(await product.getAll()); // imprimo toda la lista
  console.log(await product.getById(1)); //imprimo solo el ID 1
  console.log(await product.deleteById(2)); //Elimino el ID 2
  console.log(await product.getAll()); // imprimo toda la lista para verificar que el ID 2 haya sido borrado
  //console.log(await product.deleteAll()); //Elimino Todo
  //console.log(await product.getAll()); // imprimo la lista para verificar que este vacia
}

main();

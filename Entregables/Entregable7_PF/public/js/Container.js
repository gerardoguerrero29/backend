const fs = require("fs");
const moment = require("moment");

class Container {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async getAll() {
    try {
      const objs = await fs.promises.readFile(this.ruta, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const objs = await this.getAll();
      const indexProd = objs.findIndex((o) => o.id == id);

      if (indexProd == -1) {
        return { code: 404, msj: `Objeto ID: ${id} no se encuentra` };
      } else {
        return objs[indexProd];
      }
    } catch (error) {
      return error;
    }
  }

  async save(prod) {
    const objs = await this.getAll();

    let newId;
    objs.length == 0 ? (newId = 1) : (newId = objs[objs.length - 1].id + 1);
    const newProd = {
      ...prod,
      id: newId,
      timestamp: moment().format("DD/MM/YYYY hh:mm:ss"),
    };

    objs.push(newProd);

    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      return `ID: ${newId} Creado Exitosamente`;
    } catch (error) {
      return error;
    }
  }

  async update(prod, id) {
    const objs = await this.getAll();
    const index = objs.findIndex((o) => o.id == id);
    if (index == -1) {
      return { code: 404, msj: `Objeto ID: ${id} no se encuentra` };
    } else {
      objs[index] = {
        ...prod,
        id: id,
        timestamp: moment().format("DD/MM/YYYY hh:mm:ss"),
      };
      try {
        await fs.promises.writeFile(this.ruta, JSON.stringify(objs, null, 2));
        return `ID: ${id} Modificado Exitosamente`;
      } catch (error) {
        console.log("paso por el error");
        return error;
      }
    }
  }

  async deleteId(id) {
    const objs = await this.getAll();
    const index = objs.findIndex((o) => o.id == id);
    if (index == -1) {
      return { code: 404, msj: `Objeto ID: ${id} no se encuentra` };
    } else {
      objs.splice(index, 1);
    }
    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      return `ID: ${id} Eliminado Exitosamente`;
    } catch (error) {
      return error;
    }
  }
}

module.exports = Container;

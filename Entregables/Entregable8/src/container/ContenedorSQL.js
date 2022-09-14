import knex from "knex";

export class ContenedorSQL {
  constructor(tableName, config) {
    this.config = config;
    this.tableName = tableName;
    this.knexCli = knex(config.db);
  }

  async listarAll() {
    try {
      return await this.knexCli.from(this.tableName).select("*");
    } catch (error) {
      throw error;
    }
  }

  async listar(id) {
    try {
      return await this.knexCli
        .from(this.tableName)
        .select("*")
        .where({ id: id });
    } catch (error) {
      throw error;
    }
  }

  async insertar(obj) {
    try {
      return await this.knexCli(this.tableName).insert(obj);
    } catch (error) {
      throw error;
    }
  }

  async actualizar(id, obj) {
    try {
      return await this.knexCli(this.tableName).where({ id: id }).update(obj);
    } catch (error) {
      throw error;
    }
  }

  async eliminar(id) {
    try {
      return await this.knexCli(this.tableName).where({ id: id }).delete(id);
    } catch (error) {
      throw error;
    }
  }

  cerrarConexion() {
    console.log("Conexion Cerrada");
    this.knexCli.destroy();
  }
}

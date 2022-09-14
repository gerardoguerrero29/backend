import knex from "knex";
import { configMsj, configProducts } from "../utils/config.js";

const knexCliMsj = knex(configMsj.db);

const knexCliProducts = knex(configProducts.db);

// --------creo la tabla de mensajes en SQLite--------

knexCliMsj.schema.dropTableIfExists("mensajes").then(() => {
  knexCliMsj.schema
    .createTable("mensajes", (table) => {
      table.increments("id").primary();
      table.string("author", 50).notNullable();
      table.string("date", 50).notNullable();
      table.string("text", 50).notNullable();
    })

    .then(() => {
      console.log("tabla de mensajes creada");
    })
    .catch((e) => {
      console.log("error: ", e);
      throw e;
    })
    .finally(() => {
      knexCliMsj.destroy();
    });
});

// --------creo la tabla de productos en SQL/MariaDB--------

knexCliProducts.schema.dropTableIfExists("productos").then(() => {
  knexCliProducts.schema
    .createTable("productos", (table) => {
      table.increments("id").primary();
      table.string("nombre", 50).notNullable();
      table.integer("precio",8).notNullable();
      table.string("foto", 50).notNullable();
    })

    .then(() => {
      console.log("tabla de productos creada");
    })
    .catch((e) => {
      console.log("error: ", e);
      throw e;
    })
    .finally(() => {
      knexCliProducts.destroy();
    });
});
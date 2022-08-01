class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return `nombre completo: ${this.nombre} ${this.apellido}`;
  }

  addMascota(nuevaMascota) {
    return this.mascotas.push(nuevaMascota);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(nombre, autor) {
    return this.libros.push({nombre: nombre, autor: autor});
  }

  getBookNames() {
    let nombresLibros = [];
    this.libros.forEach((libros) => {
      nombresLibros.push(libros.nombre);
    });

    return nombresLibros;
  }
}

let usuario1 = new Usuario(
  "Gerardo",
  "Guerrero",
  [{ nombre: "Libro1", autor: "Autor1"}, {nombre: "Libro2", autor: "Autor2" }],
  ["perro", "gato"]
);

console.log(usuario1);
console.log(usuario1.getFullName());
console.log(usuario1.countMascotas());
usuario1.addMascota("canario");
console.log(usuario1.countMascotas());
console.log(usuario1.getBookNames());
usuario1.addBook("libro3","autor3");
console.log(usuario1.getBookNames());
console.log(usuario1);
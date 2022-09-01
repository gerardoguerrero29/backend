const socket = io();

socket.on("from-server-mensajes", (mensajes) => {
  render(mensajes);
});

function render(mensajes) {
  const cuerpoMensajesHtml = mensajes
      .map((msj) => {
      return `<span><b style="color:blue">${msj.author}: </b><span>${msj.date}</span><em style="color:green"> ${msj.text}</em></span>`;
    })
    .join("<br>");
  document.querySelector("#historial").innerHTML = cuerpoMensajesHtml;
}

function buttonClick() {
  const inputUser = document.querySelector("#user");
  const inputText = document.querySelector("#contenidoMensaje");

  const msj = {
    author: inputUser.value,
    text: inputText.value,
    date: new Date().toLocaleDateString("es-ar",{year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric'})
  };

  socket.emit("from-client-mensaje", msj);
}

socket.on("from-server-productos", (productos) => {
  renderProductos(productos);
});

function renderProductos(productos) {
  if (productos.length == 0) {
    document.querySelector(
      "#tablaProductos"
    ).innerHTML = `<h3 class="alert alert-warning">"No se encontraron productos"</h3>`;
  } else {
    const cuerpoProductosHtml = productos.map((prod) => {
      return `<tr>
      <td>${prod.nombre}</td>
      <td>${prod.precio}</td>
      <td><img width="50" height="50" src=${prod.foto} alt="foto" /></td>
    </tr>`;
    });

    document.querySelector(
      "#tablaProductos"
    ).innerHTML = `<div class="table-responsive">
    <h2 style="color: yellow;">Historial</h2>
    <table class="table table-dark">
      <tr style="color: yellow;">
        <th>Nombre</th>
        <th>Precio</th>
        <th>Foto</th>
      </tr>
      ${cuerpoProductosHtml}
      </table>
    </div>`;
  }
}

function buttonClickProductos() {
  const inputNombre = document.querySelector("#nombre");
  const inputPrecio = document.querySelector("#precio");
  const inputFoto = document.querySelector("#foto");

  const producto = {
    nombre: inputNombre.value,
    precio: inputPrecio.value,
    foto: inputFoto.value,
  };

  socket.emit("from-client-producto", producto);
}

const socket = io();

socket.on("from-server-mensajes", (mensajes) => {
  render(mensajes);
});

function render(mensajes) {
  const cuerpoMensajesHtml = mensajes
    .map((msj) => {
      return `<span><b>${msj.author}: </b><span>${msj.text}</span></span>`;
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
  };

  socket.emit("from-client-mensaje", msj);
}

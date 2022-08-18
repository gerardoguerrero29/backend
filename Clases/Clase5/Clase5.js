const lista={}

function generarAleatorio(desde, hasta) {
  let numAleatorio = parseInt(Math.random()*hasta)+desde;
  return numAleatorio;
}

function conteoAleatorios(desde,hasta,iteraciones) {
    
}

console.log(generarAleatorio(1, 20));

/* console.log(`inicia la ejecucion` +  new Date());

setTimeout(() => {
  console.log("Bloque luego del timeout" + new Date());
}, 5000);

console.log(`finaliza la ejecucion` + new Date()); */

/* console.log(`inicia la ejecucion ${new Date()} `);

let contador=0;

let procesoRecursivo = setInterval(() => {
  contador ++;
  console.log(`se ejecuta ${contador} veces `);
}, 1000);

console.log(`Fin de la ejecucion ${new Date()} `); */

/* const mostrarLetras = (string, timeout, cb) => {
  let contador = 0;
 const iteracion= setInterval(() => {
    console.log(string.charAt(contador));
    contador++;
    if(contador===string.length){
      clearInterval(iteracion)
      cb()}
  }, timeout);
};

mostrarLetras("hola", 0, () => console.log("Termine Hola"));
mostrarLetras("mientras", 250, () => console.log("Termine mientras"));
mostrarLetras("chau", 500, () => console.log("Termine chau")); */


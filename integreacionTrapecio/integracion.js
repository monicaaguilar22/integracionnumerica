/* const limiteInferior = 0;
const limiteSuperior = 2;
const numeroIteraciones = 4;
const potencia = 2; */
const spanRespuesta = document.querySelector('.respuesta');
const vx = document.querySelector('#valorx').disabled = true;
const button = document.querySelector('#calcular');

button.addEventListener('click', () => {
  const limiteInferior = parseInt(document.querySelector('#limiteInferior').value);
  const limiteSuperior = parseInt(document.querySelector('#limiteSuperior').value);
  const numeroIteraciones = parseInt(document.querySelector('#numeroIteraciones').value);
  const potencia = parseInt(document.querySelector('#pow').value);

  const deltax = (limiteSuperior - limiteInferior) / numeroIteraciones;
  let xPotencia = 0;
  let fx = 0;
  let aproximacion = 0;
  let valoresGrafica = [0];
  let x = 0;
  for (let i = 0; i <= numeroIteraciones; i++) {
    if (i > 0 && i < numeroIteraciones) {
      x += deltax;
      xPotencia = Math.pow(x, potencia);
      fx += 2 * Math.sin(xPotencia);
      valoresGrafica.push(2 * Math.sin(xPotencia));
    } else if (i > numeroIteraciones - 1) {
      x += deltax;
      xPotencia = Math.pow(x, potencia);
      fx += Math.sin(xPotencia);
      valoresGrafica.push(Math.sin(xPotencia));
    }
  }
  valoresGrafica.forEach(valor => {
    //console.log(valor); //valores a graficar
  });

  aproximacion = fx * ((limiteSuperior - limiteInferior) / (2 * numeroIteraciones));
  spanRespuesta.innerHTML = `Aproximacion: &asymp; ${aproximacion}`;
});

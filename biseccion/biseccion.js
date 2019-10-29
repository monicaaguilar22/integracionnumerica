const valor1 = document.querySelector('#valor1');
const valor2 = document.querySelector('#valor2');
const valor3 = document.querySelector('#valor3');
const xi = document.querySelector('#xi');
const xs = document.querySelector('#xs');
const tbody = document.querySelector('.tbody');
const table = document.querySelector('#table');

const simbolo1 = document.querySelector('#simbolo1');
const simbolo2 = document.querySelector('#simbolo2');

const btn = document.querySelector('#calcular');
//evento al presionar el boton
btn.addEventListener('click', e => {
  e.preventDefault();
  obtenerValores();
});

obtenerValores = () => {
  //const valora = parseInt(valor1.value);
  const valorb = parseInt(valor2.value);
  const valorc = parseInt(valor3.value);

  const operacion1 = simbolo1.value;
  const operacion2 = simbolo2.value;

  let s1 = validarOperacion(operacion1);
  let s2 = validarOperacion(operacion2);
  if (s1 && s2) {
    calcularBiseccion( valorb, valorc, operacion1, operacion2);
  } else {
    //mostrar error
  }
};

validarOperacion = simbolo => {
  if (simbolo !== '+' && simbolo !== '-') {
    console.log('Solo se permiten sumas y restas');
    return false;
  }
  return true;
};

calcularBiseccion = ( valor2, valor3, operacion1, operacion2) => {
  let xi = 0;
  let xs = 10;
  let xa = (xi + xs) / 2;
  let error;
  let fxi, fxa;
  let fxixfxa;
  let i = 0;
  while (i < 15) {
    if (operacion1 === '+') {
      fxi = xi * xi + valor2 * xi;
      fxa = xa * xa + valor2 * xa;
    } else {
      fxi = xi * xi - valor2 * xi;
      fxa = xa * xa - valor2 * xa;
    }
    if (operacion2 === '+') {
      fxi += valor3;
      fxa += valor3;
    } else {
      fxi -= valor3;
      fxa -= valor3;
    }
    fxixfxa = fxi * fxa;
    error = fxa;
    if (fxixfxa > 0) {
      xi = xa;
      xa = (xi + xs) / 2;
    } else {
      xs = xa;
      xa = (xi + xs) / 2;
    }
    i = i + 1;

    let row = table.insertRow(i);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    let cell5 = row.insertCell(5);
    let cell6 = row.insertCell(6);
    cell0.innerHTML = xi;
    cell1.innerHTML = xs;
    cell2.innerHTML = xa;
    cell3.innerHTML = fxi;
    cell4.innerHTML = fxa;
    cell5.innerHTML = fxixfxa;
    cell6.innerHTML = error;
  }
};

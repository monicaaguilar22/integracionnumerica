var maxIteraciones = 200;

var gaussJacobi = {
  valoresX: [],

  testarConvergencia: function(A) {
    var somaLinha;
    for (var i = 0; i < A.length; i++) {
      somaLinha = 0;
      for (var j = 0; j < A[i].length; j++) {
        if (j !== i) somaLinha += Math.abs(A[i][j]);
      }
      if (somaLinha / A[i][i] >= 1) return false;
    }
    return true;
  },

  aplicar: function(A, b, x0, e) {
    this.valoresX = [];
    this.valoresX.unshift(x0.slice());
    var tempX = new Array(x0.length),
      numIteraciones = 0;
    do {
      numIteraciones++;
      for (var i = 0; i < A.length; i++) {
        tempX[i] = b[i];
        for (var j = 0; j < A.length; j++) {
          if (j !== i) tempX[i] -= A[i][j] * this.valoresX[0][j];
        }
        tempX[i] /= A[i][i];
      }
      this.valoresX.unshift(tempX.slice());
      if (numIteraciones >= 200) {
        break;
      }
    } while (!checarPrecision(e[0], this.valoresX[0], this.valoresX[1]));
    updatePanel('gj', this.valoresX, numIteraciones, e, this.testarConvergencia(A));
  }
};

var gaussSeidel = {
  valoresX: [],

  testarConvergencia: function(A) {
    var somaLinha,
      b = new Array(A.length).fill(1);
    for (var i = 0; i < A.length; i++) {
      somaLinha = 0;
      for (var j = 0; j < A[i].length; j++) {
        if (j !== i) somaLinha += Math.abs(A[i][j]) * b[j];
      }
      if (somaLinha / A[i][i] >= 1) return false;
      else b[i] = somaLinha / A[i][i];
    }
    return true;
  },

  aplicar: function(A, b, x0, e) {
    this.valoresX = [];
    this.valoresX.unshift(x0.slice());
    var tempX = this.valoresX[0].slice(),
      numIteraciones = 0;
    do {
      for (var i = 0; i < A.length; i++) {
        tempX[i] = b[i];
        for (var j = 0; j < A.length; j++) {
          if (j !== i) tempX[i] -= A[i][j] * tempX[j];
        }
        tempX[i] /= A[i][i];
      }
      this.valoresX.unshift(tempX.slice());
      numIteraciones++;
      if (numIteraciones >= 200) {
        break;
      }
    } while (!checarPrecision(e[0], this.valoresX[0], this.valoresX[1]));
    updatePanel('gs', this.valoresX, numIteraciones, e, this.testarConvergencia(A));
  }
};

function checarPrecision(e, arr1, arr2) {
  if (arr1.length === arr2.length) {
    for (var i = 0; i < arr1.length; i++) {
      if (Math.abs(arr1[i] - arr2[i]) >= e) return false;
    }
    return true;
  }
}

function updatePanel(name, valores, num, e, conv) {
  $('#' + name + '-aprox').html(formatarVetor(valores[0], e[1] + 1));
  $('#' + name + '-numI').html(num);
  if (conv) {
    $('#' + name + '-conv').css('color', 'green');
    $('#' + name + '-conv').html('Satisfecho');
  } else {
    $('#' + name + '-conv').css('color', 'red');
    $('#' + name + '-conv').html('No-Satisfecho');
  }
  $('#' + name + '-seq').html('');
  for (var i = 1; i < valores.length; i++) {
    $('#' + name + '-seq').append(i + 'ª iteracion:\n');
    $('#' + name + '-seq').append(formatarVetor(valores[valores.length - i - 1], e[1] + 1));
    $('#' + name + '-seq').append(i === valores.length - 1 ? '' : '\n');
  }
}

function formatarVetor(arr, casas) {
  var str = '[';
  for (var i = 0; i < arr.length; i++) {
    if (i > 0) str += ' , ';
    str += arr[i].toFixed(casas);
  }
  str += arr.length > 0 ? ']' : ' ]';
  return str;
}

$('document').ready(function() {
  $('#btn-calcular').click(function() {
    //Reconhecendo a Matriz A
    var A = $('#in-matriz')
      .val()
      .split('\n');
    for (var i = 0; i < A.length; i++) {
      A[i] = A[i].split(' ');
      A[i].forEach(function(val, j, arr) {
        arr[j] = parseFloat(arr[j]);
      });
    }
    //Reconhecendo o vetor b
    var b = $('#in-b')
      .val()
      .split(' ');
    for (var i = 0; i < b.length; i++) {
      b[i] = parseFloat(b[i]);
    }
    //Reconhecendo o vetor inicial x0
    var x0 = $('#in-x0')
      .val()
      .split(' ');
    for (var i = 0; i < x0.length; i++) {
      x0[i] = parseFloat(x0[i]);
    }
    //Reconhecendo a precisão
    var e = [0, 0];
    e[0] = parseFloat($('#in-e').val());
    e[1] = $('#in-e')
      .val()
      .split('.')[1].length;

    gaussJacobi.aplicar(A, b, x0, e);
    gaussSeidel.aplicar(A, b, x0, e);
  });
});

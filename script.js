function add(n, m) {
  return n + m;
}

function subs(n, m) {
  return n - m;
}

function mult(n, m) {
  return n * m;
}

function div(n, m) {
  if (m == 0) {
    return "Error";
  }
  return n / m;
}

function operate(operator, a, b) {
  if (operator == "+") {
    return add(a, b);
  } else if (operator == "-") {
    return subs(a, b);
  } else if (operator == "*") {
    return mult(a, b);
  } else if (operator == "/") {
    return div(a, b);
  } else {
    return "Operador invalido";
  }
}

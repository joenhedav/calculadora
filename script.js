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

let firstValue = "";
let secondValue = "";
let operator = "";
let currentValue = false;

function showCurrentValue(value) {
  const display = document.querySelector(".display");
  display.textContent = value;
}

function getCurrentValue(value) {
  if (currentValue) {
    firstValue = "";
    currentValue = false;
  }

  if (operator === "") {
    firstValue += value;
    showCurrentValue(firstValue);
  } else {
    secondValue += value;
    showCurrentValue(secondValue);
  }
}

function getCurrentOperator(value) {
  if (firstValue === "") {
    return;
  } else {
    operator = value;
    showCurrentValue(firstValue + " " + operator);
  }
}

function getResult() {
  if (firstValue !== "" && secondValue !== "") {
    let result = operate(
      operator,
      parseFloat(firstValue),
      parseFloat(secondValue),
    );
    showCurrentValue(result);
    firstValue = result.toString();
    secondValue = "";
    operator = "";
    currentValue = true;
  }
}

function clearValue() {
  if (secondValue !== "") {
    secondValue = secondValue.slice(0, -1);
    showCurrentValue(secondValue);
  } else if (operator !== "") {
    operator = "";
    showCurrentValue(firstValue);
  } else {
    firstValue = firstValue.slice(0, -1);
    showCurrentValue(firstValue);
  }
}

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    const value = e.target.textContent;
    getCurrentValue(value);
  });
});

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    const value = e.target.textContent;
    getCurrentOperator(value);
  });
});

const equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
  getResult();
});

const deleteValue = document.querySelector("#delete");
deleteValue.addEventListener("click", () => {
  clearValue();
});

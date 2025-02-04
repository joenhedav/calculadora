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
  }
}

let firstValue = "";
let secondValue = "";
let operator = "";
let currentValue = false;
let isOn = false;
const maxInput = 10;

function showCurrentValue(value) {
  const display = document.querySelector(".display");
  display.textContent = value;
}

function toggleOnOff() {
  isOn = !isOn;
  if (isOn) {
    resetCalc();
    showCurrentValue("0");
  } else {
    showCurrentValue("");
  }
}

function resetCalc() {
  firstValue = "";
  secondValue = "";
  operator = "";
  currentValue = false;
}

function getCurrentValue(value) {
  if (!isOn) {
    return;
  }
  if (value === ".") {
    if (operator === "" && firstValue.includes(".")) return;
    if (operator !== "" && secondValue.includes(".")) return;
  }

  if (currentValue) {
    if (value === ".") {
      firstValue = ".";
    } else {
      firstValue = value;
    }
    currentValue = false;
  } else {
    if (operator === "") {
      if (firstValue.length < maxInput) {
        firstValue += value;
      }
    } else {
      if (secondValue.length < maxInput) {
        secondValue += value;
      }
    }
  }
  if (operator === "") {
    showCurrentValue(firstValue);
  } else {
    showCurrentValue(secondValue);
  }
}

function getCurrentOperator(value) {
  if (!isOn || firstValue === "") {
    return;
  }
  if (currentValue) {
    currentValue = false;
  }
  operator = value;
  showCurrentValue(firstValue + " " + operator);
}

function toggleSign() {
  if (!isOn) {
    return;
  }
  if (operator === "") {
    if (firstValue !== "") {
      firstValue = (parseFloat(firstValue) * -1).toString();
      showCurrentValue(firstValue);
    }
  } else {
    if (currentValue !== "") {
      secondValue = (parseFloat(secondValue) * -1).toString();
      showCurrentValue(secondValue);
    }
  }
}

function getResult() {
  if (firstValue !== "" && secondValue !== "") {
    let result = operate(
      operator,
      parseFloat(firstValue),
      parseFloat(secondValue),
    );

    if (result.toString().length > 10) {
      result = result.toExponential(5);
    }

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

const ce = document.querySelector("#ce");
ce.addEventListener("click", toggleOnOff);

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    const value = e.target.textContent;
    getCurrentValue(value);
  });
});

const decimal = document.querySelector('.decimal');
decimal.addEventListener("click", (e) => {
  getCurrentValue(e.target.textContent);
})

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    const value = e.target.textContent;
    getCurrentOperator(value);
  });
});

const sign = document.querySelector("#sign");
sign.addEventListener("click", toggleSign);

const equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
  getResult();
});

const deleteValue = document.querySelector("#delete");
deleteValue.addEventListener("click", () => {
  clearValue();
});

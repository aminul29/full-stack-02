import { calculatorDisplay } from "./selector.js";
import { getAwaitingNextValue, getOperatorValue, getFirstValue, setAwaitingNextValue, setOperatorValue, setFirstValue } from "./values.js";
import calculate from "./calculate.js";

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  if (getOperatorValue() && getAwaitingNextValue()) {
    setOperatorValue(operator);
    return;
  }
  if (!getFirstValue()) {
    setFirstValue(currentValue);
  } else {
    const calculation = calculate[getOperatorValue()](getFirstValue(), currentValue);
    calculatorDisplay.textContent = calculation;
    getFirstValue(calculation);
  }
  setAwaitingNextValue(true);
  setOperatorValue(operator);
}

export default useOperator;
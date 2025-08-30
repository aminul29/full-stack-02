import { getAwaitingNextValue } from "./values.js";
import { calculatorDisplay } from "./selector.js";

function addDecimal() {
  if (getAwaitingNextValue()) return;
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

export default addDecimal;
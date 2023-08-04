import inquirer from "inquirer";

interface CalculatorInput {
  num1: number;
  num2: number;
  operator: string;
}

const questions: CalculatorInput = await inquirer.prompt([
  {
    type: "number",
    name: "num1",
    message: "Enter the first number:",
  },
  {
    type: "number",
    name: "num2",
    message: "Enter the second number:",
  },
  {
    type: "list",
    name: "operator",
    message: "Select an operator:",
    choices: ["+", "-", "*", "/"],
  },
]);

const { operator, num1, num2 } = questions;

if (operator == "+") {
  console.log(`${num1} + ${num2} = ${num1 + num2}`);
} else if (operator == "-") {
  console.log(`${num1} - ${num2} = ${num1 - num2}`);
} else if (operator == "*") {
  console.log(`${num1} x ${num2} = ${num1 * num2}`);
} else if (operator == "/") {
  console.log(`${num1} / ${num2} = ${num1 / num2}`);
}

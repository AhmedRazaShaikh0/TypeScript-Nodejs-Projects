// #! /usr/bin/env node
// import inquirer from "inquirer";
// const sleep = () => {
//   return new Promise((res) => {
//     setTimeout(res, 2000);
//   });
// };
// async function welcome() {
//   await sleep();
//   console.log(
//     `                     _____________________
//                     |  _________________  |
//                     | |                 | |
//                     | |_________________| |
//                     |  ___ ___ ___   ___  |
//                     | | 7 | 8 | 9 | | + | |
//                     | |___|___|___| |___| |
//                     | | 4 | 5 | 6 | | - | |
//                     | |___|___|___| |___| |
//                     | | 1 | 2 | 3 | | x | |
//                     | |___|___|___| |___| |
//                     | | . | 0 | = | | / | |
//                     | |___|___|___| |___| |
//                     |_____________________|
//                  _________________________________
//                 | 𝓒𝓪𝓵𝓬𝓾𝓵𝓪𝓽𝓸𝓻 𝓑𝔂 𝓐𝓱𝓶𝓮𝓭 𝓡𝓪𝔃𝓪 𝓢𝓱𝓪𝓲𝓴𝓱 |
//                 |_________________________________|
//     `
//   );
// }
// welcome();
// async function askQuestion() {
//   var answers = await inquirer.prompt([
//     /* Pass your questions in here */
//     {
//       type: "list",
//       name: "Operator",
//       message: "Which type of calculation you want to perform? \n",
//       choices: ["Addition", "Subtraction", "Multiplication", "Division"],
//     },
//     {
//       type: "number",
//       name: "num1",
//       message: "Enter Number 1:",
//     },
//     {
//       type: "number",
//       name: "num2",
//       message: "Enter Number 2:",
//     },
//   ]);
//   // Use user feedback for... whatever!!
//   if (answers.Operator == "Addition") {
//     console.log(
//       `${answers.num1} + ${answers.num2} = ${answers.num1 + answers.num2}`
//     );
//   } else if (answers.Operator == "Subtraction") {
//     console.log(
//       `${answers.num1} - ${answers.num2} = ${answers.num1 - answers.num2}`
//     );
//   } else if (answers.Operator == "Multiplication") {
//     console.log(
//       `${answers.num1} x ${answers.num2} = ${answers.num1 * answers.num2}`
//     );
//   } else if (answers.Operator == "Division") {
//     console.log(
//       `${answers.num1} / ${answers.num2} = ${answers.num1 / answers.num2}`
//     );
//   }
// }
// // askQuestion();
// async function startAgain() {
//   do {
//     await askQuestion();
//     var again = await inquirer.prompt({
//       type: "input",
//       name: "restart",
//       message: "Do You Want To Continue? Press Y or N: ",
//     });
//   } while (
//     again.restart == "y" ||
//     again.restart == "Y" ||
//     again.restart == "YES" ||
//     again.restart == "yes"
//   );
// }
// startAgain();
import inquirer from "inquirer";
const questions = await inquirer.prompt([
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
}
else if (operator == "-") {
    console.log(`${num1} - ${num2} = ${num1 - num2}`);
}
else if (operator == "*") {
    console.log(`${num1} x ${num2} = ${num1 * num2}`);
}
else if (operator == "/") {
    console.log(`${num1} / ${num2} = ${num1 / num2}`);
}
// import inquirer from "inquirer";
// interface InputType {
// 	numberOne: number;
// 	numberTwo: number;
// 	operator: string;
// }
// const answers: InputType = await inquirer.prompt([
// 	{
// 		type: "number",
// 		name: "numberOne",
// 		message: "Enter First No: ",
// 	},
// 	{
// 		type: "number",
// 		name: "numberTwo",
// 		message: "Enter Second No: ",
// 	},
// 	{
// 		type: "list",
// 		name: "operator",
// 		choices: ["+", "-", "*", "/"],
// 		message: "Select Operator: ",
// 	},
// ]);
// const { numberOne, numberTwo, operator } = answers;
// if (numberOne && numberTwo && operator) {
// 	let result: number = 0;
// 	if (operator === "+") {
// 		result = numberOne + numberTwo;
// 	} else if (operator === "-") {
// 		result = numberOne - numberTwo;
// 	} else if (operator === "*") {
// 		result = numberOne * numberTwo;
// 	} else {
// 		result = numberOne / numberTwo;
// 	}
// 	console.log(result);
// } else {
// 	console.log("Kindly Provide Valid Inputs");
// }

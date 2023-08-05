#! /usr/bin/env node

import inquirer from "inquirer";

interface UserInputType {
  userId: string;
  userPin: number;
  transactionType: string;
  amount: number;
}

const answers: UserInputType = await inquirer.prompt([
  {
    type: "input",
    name: "userId",
    message: "Kindly Enter Your Id: ",
  },
  {
    type: "number",
    name: "userPin",
    message: "Kindly Enter Your PIN: ",
  },
  {
    type: "list",
    name: "transactionType",
    choices: ["Fast Cash", "Custom Withdrawal"],
    message: "Select Your Transaction Type: ",
    when(answers) {
      return answers.userId && answers.userPin;
    },
  },
  {
    type: "list",
    name: "amount",
    choices: [1000, 2000, 5000, 10000, 25000],
    message: "Select Your amount: ",
    when(answers) {
      return answers.transactionType == "Fast Cash";
    },
  },
  {
    type: "number",
    name: "amount",
    message: "Enter Your amount: ",
    when(answers) {
      return answers.transactionType == "Custom Withdrawal";
    },
  },
]);

if (answers.userId && answers.userPin) {
  const balance = 500000;
  console.log("Previous Balance: ", balance);
  const enteredAmount = answers.amount;
  if (balance >= enteredAmount) {
    const remainingBalance = balance - enteredAmount;
    console.log("Your Remaining Balance Is: ", remainingBalance);
  } else {
    console.log("Insufficient Balance");
  }
} else {
  console.log("Enter Correct userId & userPin");
}

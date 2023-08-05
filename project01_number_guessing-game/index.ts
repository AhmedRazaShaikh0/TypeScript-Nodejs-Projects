import inquirer from "inquirer";

interface UserInputType {
  UserNumber: number;
}

const ComputerNumber = Math.floor(Math.random() * 10);

const questions: UserInputType = await inquirer.prompt([
  {
    type: "number",
    name: "UserNumber",
    message: "Enter Your Number b/w 1-10:",
  },
]);

if (ComputerNumber === questions.UserNumber) {
  console.log(
    "Computer's Number:",
    ComputerNumber,
    "User's Number:",
    questions.UserNumber
  );
  console.log("Congratulations! You Win");
} else {
  console.log(
    "Computer's Number:",
    ComputerNumber,
    "|",
    "User's Number:",
    questions.UserNumber
  );
  console.log("Oops! You Lose");
}

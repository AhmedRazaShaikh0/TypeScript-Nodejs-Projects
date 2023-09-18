import inquirer from "inquirer";
const userInput = await inquirer.prompt([
    {
        type: "input",
        name: "paragraph",
        message: "Enter Your Para: ",
    },
]);
const wordsCount = userInput.paragraph.trim().split(" ");
console.log("Total Words In This Para Are: " + wordsCount.length);

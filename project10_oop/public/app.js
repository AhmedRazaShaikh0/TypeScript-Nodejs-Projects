import inquirer from "inquirer";
import { Student } from "./classes.js";
const { number } = await inquirer.prompt([
    {
        type: "number",
        name: "number",
        message: "Type 1 if you like to talk to others and 2 if you would rather keep it to yourself: ",
    },
]);
const NewStudent = new Student();
console.log("1", NewStudent);
NewStudent.AskQuestion(number);
console.log("2", NewStudent);
console.log(`You are: ${NewStudent.GetPersonality()}`);
const { name } = await inquirer.prompt([
    {
        name: "name",
        message: "Enter Your Name: ",
    },
]);
if (NewStudent.Name === "") {
    NewStudent.Name = "Unknown";
}
else {
    NewStudent.Name = name;
}
console.log("3", NewStudent);
console.log(`Your Name is ${NewStudent.Name} and your personality is ${NewStudent.GetPersonality()} `);

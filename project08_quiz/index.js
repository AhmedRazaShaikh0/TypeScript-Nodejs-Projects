import inquirer from "inquirer";
const questions = [
    {
        text: "What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        correctOptionIndex: 0,
    },
    {
        text: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctOptionIndex: 0,
    },
];
async function QuizApp() {
    console.log("Welcome to Quiz!\n");
    const userAnswers = [];
    for (const question of questions) {
        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "selectedOption",
                message: question.text,
                choices: question.options,
            },
        ]);
        userAnswers.push(question.options.indexOf(answer.selectedOption));
    }
    console.log("\nQuiz completed!\n");
    let score = 0;
    userAnswers.forEach((userAnswer, index) => {
        if (userAnswer === questions[index].correctOptionIndex) {
            score++;
        }
    });
    console.log(`Your score: ${score} out of ${questions.length}`);
}
QuizApp();

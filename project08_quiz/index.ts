import inquirer from "inquirer";

interface Question {
  text: string;
  options: string[];
  correctOption: string;
}

const questions: Question[] = [
  {
    text: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctOption: "Paris",
  },
  {
    text: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctOption: "Mars", 
  },
];

async function QuizApp() {
  console.log("Welcome to Quiz App!\n");

  const userAnswers: string[] = []; 

  for (const question of questions) {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "selectedOption",
        message: question.text,
        choices: question.options,
      },
    ]);

    userAnswers.push(answer.selectedOption);
  }

  console.log("\nQuiz completed!\n");

  let score = 0;
  userAnswers.forEach((userAnswer, index) => {
    if (userAnswer === questions[index].correctOption) {
      score++;
    }
  });

  console.log(`Your score: ${score} out of ${questions.length}`);
}
QuizApp();

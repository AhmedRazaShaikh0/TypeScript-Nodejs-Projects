import inquirer from 'inquirer';

async function startCountdown() {
  const questions = [
    {
      type: 'input',
      name: 'countdownLimit',
      message: 'Enter the countdown limit in seconds:',
      validate: (input: any) => {
        const seconds = parseInt(input);
        return !isNaN(seconds) && seconds >= 0;
      },
    },
  ];

  const answers = await inquirer.prompt(questions);
  const countdownLimit = parseInt(answers.countdownLimit);

  if (countdownLimit === 0) {
    console.log('Countdown limit must be greater than 0.');
    return;
  }

  const targetDate = new Date(Date.now() + countdownLimit * 1000);

  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeDifference = targetDate.getTime() - now;

    if (timeDifference > 0) {
      const totalSeconds = Math.floor(timeDifference / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      console.clear();
      console.log(`Countdown: ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    } else {
      clearInterval(countdownInterval);
      console.log('Countdown has ended!');
    }
  }, 1000);
}

startCountdown();

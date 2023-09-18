import inquirer from 'inquirer';
let todos = [];
let loop = true;
while (loop) {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'TODO',
            message: 'What do you want to add in your todo?'
        },
        {
            type: 'confirm',
            name: 'addMore',
            message: 'Do you want to add more todo?',
            default: false
        }
    ]);
    const { TODO, addMore } = answers;
    loop = addMore;
    if (TODO) {
        todos.push(TODO);
    }
    else {
        console.log('Kindly Add Valid Input');
    }
}
if (todos.length > 0) {
    console.log('Your todo list is:');
    todos.forEach(todo => {
        console.log(todo);
    });
}
else {
    console.log('No Todos found');
}

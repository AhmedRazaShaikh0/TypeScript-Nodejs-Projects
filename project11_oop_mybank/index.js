class BankAccount {
    accountNumber = Math.floor(Math.random() * (9 * Math.pow(10, 10))) + Math.pow(10, 10);
    accountBalance;
    transactionHistory = [];
    constructor() {
        this.accountBalance = 100;
    }
    Debit(amount) {
        let index = String(new Date()).lastIndexOf(":") + 3;
        let date = String(new Date()).slice(0, index);
        this.accountBalance -= amount;
        this.transactionHistory.push({
            type: "Debit",
            amount: amount,
            date: date,
            fee: 0,
        });
    }
    Credit(amount) {
        let index = String(new Date()).lastIndexOf(":") + 3;
        let date = String(new Date()).slice(0, index);
        if (amount > 100) {
            this.accountBalance += amount - 1;
            this.transactionHistory.push({
                type: "Credit",
                amount: amount,
                date: date,
                fee: 1,
            });
        }
        else {
            this.accountBalance += amount;
            this.transactionHistory.push({
                type: "Credit",
                amount: amount,
                date: date,
                fee: 0,
            });
        }
    }
}
export class Customer {
    name;
    userId;
    age;
    contactNumber;
    pin;
    bankAccount;
    constructor(name, age, contactNumber, pin, userId) {
        this.name = name;
        this.age = age;
        this.contactNumber = contactNumber;
        this.pin = pin;
        this.userId = userId;
        this.bankAccount = new BankAccount();
    }
}
// #!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const sleep = () => new Promise((r) => setTimeout(r, 2000));
console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<=================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<===========>>>  ${chalk.redBright.bold("MY BANK")}  <<<===========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<=================================>>>\n`));
let customers = [];
async function Choice() {
    const { option } = await inquirer.prompt([
        {
            name: "option",
            message: "What Would You Like To Do ?",
            type: "list",
            choices: [
                { name: "Create New Account", value: "C" },
                { name: "Sign In", value: "S" },
            ],
        },
    ]);
    return option;
}
async function CreateNewAccount() {
    let Names;
    (function (Names) {
        Names["Name"] = "Name";
        Names["Age"] = "Age";
        Names["ContactNumber"] = "Contact Number";
        Names["Pin"] = "Pin";
        Names["UserID"] = "UserID";
    })(Names || (Names = {}));
    async function Inputs(name, type) {
        while (true) {
            const { input } = await inquirer.prompt([
                {
                    name: "input",
                    message: `Enter Your ${name} : `,
                    type: type,
                },
            ]);
            if (!input) {
                continue;
            }
            if (name === Names.ContactNumber) {
                let numRegex = /^(\+92|0|92)[0-9]{10}$/;
                if (!numRegex.test(input)) {
                    console.log(chalk.redBright(`  Use Pakistani Number`));
                    continue;
                }
            }
            if (name === Names.UserID) {
                let customer = customers.filter((val) => val.userId === input);
                if (customer.length) {
                    console.log(chalk.redBright(`  This UserID Is Already Taken Try Different`));
                    continue;
                }
            }
            return input;
        }
    }
    let name = await Inputs(Names.Name, "string");
    let age = await Inputs(Names.Age, "number");
    let contactNumber = await Inputs(Names.ContactNumber, "string");
    let pin = await Inputs(Names.Pin, "number");
    let userId = await Inputs(Names.UserID, "string");
    let customer = new Customer(name, age, contactNumber, pin, userId);
    await sleep();
    customers.push(customer);
}
async function SignIn() {
    const { userID, pin } = await inquirer.prompt([
        {
            name: "userID",
            message: "Enter Your UserID : ",
        },
        {
            name: "pin",
            message: "Enter Your Pin : ",
            type: "number",
        },
    ]);
    let customer = customers.find((val) => val.userId === userID);
    await sleep();
    if (!customer) {
        return;
    }
    else {
        if (customer.pin !== pin) {
            return;
        }
        console.log(chalk.whiteBright(`\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n`));
        while (true) {
            const { userChoice, } = await inquirer.prompt([
                {
                    name: "userChoice",
                    message: "Make Your Choice",
                    type: "rawlist",
                    choices: [
                        "Show Profile",
                        "Debit",
                        "Credit",
                        "Account Balance",
                        "Transaction History",
                    ],
                },
            ]);
            switch (userChoice) {
                case "Show Profile":
                    DisplayInfo(customer);
                    break;
                case "Account Balance":
                    ShowAccountBalance(customer);
                    break;
                case "Credit":
                    await Credit(customer);
                    break;
                case "Debit":
                    await Debit(customer);
                    break;
                case "Transaction History":
                    TransactionHistory(customer);
                    break;
                default:
                    break;
            }
            const { choice } = await inquirer.prompt([
                {
                    name: "choice",
                    message: "Select One: ",
                    type: "list",
                    choices: ["Perform Another Task", "Sign Out"],
                },
            ]);
            if (choice === "Sign Out") {
                console.log(chalk.whiteBright(`\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n`));
                break;
            }
            else {
                console.log(chalk.whiteBright(`\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n`));
                continue;
            }
        }
    }
}
while (true) {
    let choice = await Choice();
    if (choice === "C") {
        await CreateNewAccount();
    }
    else if (choice === "S") {
        await SignIn();
    }
    // EXIT PROGRAM CHOICE
    const input = await inquirer.prompt([
        {
            name: chalk.rgb(255, 255, 160)(`Do You Want To Exit?`),
            type: "confirm",
            default: false,
        },
    ]);
    let value = await input["\x1B[38;2;255;255;160mDo You Want To Exit?\x1B[39m"];
    if (value) {
        break;
    }
    console.log(chalk.whiteBright("\n================================================================"));
    console.log(chalk.whiteBright("================================================================\n"));
}
export function DisplayInfo(customer) {
    console.log(chalk.whiteBright(`--------------------------------------`));
    console.log(chalk.whiteBright(`${chalk.bgRgb(1, 59, 52)(`Name            : `)} ${customer.name}`));
    console.log(chalk.whiteBright(`${chalk.bgRgb(1, 59, 52)(`Age             : `)} ${customer.age}`));
    console.log(chalk.whiteBright(`${chalk.bgRgb(1, 59, 52)(`Contact Number  : `)} ${customer.contactNumber}`));
    console.log(chalk.whiteBright(`${chalk.bgRgb(1, 59, 52)(`UserID          : `)} ${customer.userId}`));
    console.log(chalk.whiteBright(`${chalk.bgRgb(1, 59, 52)(`Account Balance : `)} RS: ${customer.bankAccount.accountBalance}`));
    console.log(chalk.whiteBright(`${chalk.bgRgb(1, 59, 52)(`Account Number  : `)} ${customer.bankAccount.accountNumber}`));
    console.log(chalk.whiteBright(`--------------------------------------`));
}
export function ShowAccountBalance(customer) {
    console.log(chalk.whiteBright(`--------------------------------------`));
    console.log(chalk.whiteBright(`${chalk.bgRgb(1, 59, 52)(`Account Balance : `)} RS: ${customer.bankAccount.accountBalance}`));
    console.log(chalk.whiteBright(`--------------------------------------`));
}
export async function Credit(customer) {
    while (true) {
        const { amount } = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter Amount : ",
                type: "number",
            },
        ]);
        await sleep();
        if (!amount) {
            continue;
        }
        customer.bankAccount.Credit(amount);
        return;
    }
}
export async function Debit(customer) {
    while (true) {
        const { amount } = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter Amount : ",
                type: "number",
            },
        ]);
        await sleep();
        if (!amount) {
            continue;
        }
        if (amount > customer.bankAccount.accountBalance) {
            return;
        }
        customer.bankAccount.Debit(amount);
        return;
    }
}
export function TransactionHistory(customer) {
    if (!customer.bankAccount.transactionHistory.length) {
        console.log(` No Transaction Available`);
        return;
    }
    console.table(customer.bankAccount.transactionHistory.map((val) => {
        return { ...val, fee: `RS: ${val.fee}`, amount: `RS: ${val.amount}` };
    }));
}

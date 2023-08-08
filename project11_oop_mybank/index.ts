class BankAccount {
  accountNumber =
    Math.floor(Math.random() * (9 * Math.pow(10, 10))) + Math.pow(10, 10);
  accountBalance: number;
  transactionHistory: {
    type: "Credit" | "Debit";
    amount: number;
    date: string;
    fee: number;
  }[] = [];
  constructor() {
    this.accountBalance = 100;
  }
  Debit(amount: number) {
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
  Credit(amount: number) {
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
    } else {
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
  name: string;
  userId: string;
  age: number;
  contactNumber: string;
  pin: number;
  bankAccount: BankAccount;

  constructor(
    name: string,
    age: number,
    contactNumber: string,
    pin: number,
    userId: string
  ) {
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

console.log(
  chalk.bold.rgb(204, 204, 204)(`\n   <<<=================================>>>`)
);
console.log(
  chalk.bold.rgb(
    204,
    204,
    204
  )(`<<<===========>>>  ${chalk.redBright.bold("MY BANK")}  <<<===========>>>`)
);
console.log(
  chalk.bold.rgb(204, 204, 204)(`   <<<=================================>>>\n`)
);

let customers: Customer[] = [];

async function Choice() {
  const { option }: { option: "C" | "S" } = await inquirer.prompt([
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
  enum Names {
    Name = "Name",
    Age = "Age",
    ContactNumber = "Contact Number",
    Pin = "Pin",
    UserID = "UserID",
  }
  async function Inputs(name: Names, type: string) {
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
          console.log(
            chalk.redBright(`  This UserID Is Already Taken Try Different`)
          );
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
  const { userID, pin }: { userID: string; pin: number } =
    await inquirer.prompt([
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
  } else {
    if (customer.pin !== pin) {
      return;
    }
    console.log(
      chalk.whiteBright(
        `\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n`
      )
    );
    while (true) {
      const {
        userChoice,
      }: {
        userChoice:
          | "Show Profile"
          | "Debit"
          | "Credit"
          | "Account Balance"
          | "Transaction History";
      } = await inquirer.prompt([
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

      const { choice }: { choice: "Perform Another Task" | "Sign Out" } =
        await inquirer.prompt([
          {
            name: "choice",
            message: "Select One: ",
            type: "list",
            choices: ["Perform Another Task", "Sign Out"],
          },
        ]);
      if (choice === "Sign Out") {
        console.log(
          chalk.whiteBright(
            `\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n`
          )
        );
        break;
      } else {
        console.log(
          chalk.whiteBright(
            `\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n`
          )
        );
        continue;
      }
    }
  }
}

while (true) {
  let choice = await Choice();
  if (choice === "C") {
    await CreateNewAccount();
  } else if (choice === "S") {
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
  let value: boolean = await input[
    "\x1B[38;2;255;255;160mDo You Want To Exit?\x1B[39m"
  ];
  if (value) {
    break;
  }
  console.log(
    chalk.whiteBright(
      "\n================================================================"
    )
  );
  console.log(
    chalk.whiteBright(
      "================================================================\n"
    )
  );
}

export function DisplayInfo(customer: Customer) {
  console.log(chalk.whiteBright(`--------------------------------------`));
  console.log(
    chalk.whiteBright(
      `${chalk.bgRgb(1, 59, 52)(`Name            : `)} ${customer.name}`
    )
  );
  console.log(
    chalk.whiteBright(
      `${chalk.bgRgb(1, 59, 52)(`Age             : `)} ${customer.age}`
    )
  );
  console.log(
    chalk.whiteBright(
      `${chalk.bgRgb(1, 59, 52)(`Contact Number  : `)} ${
        customer.contactNumber
      }`
    )
  );
  console.log(
    chalk.whiteBright(
      `${chalk.bgRgb(1, 59, 52)(`UserID          : `)} ${customer.userId}`
    )
  );
  console.log(
    chalk.whiteBright(
      `${chalk.bgRgb(1, 59, 52)(`Account Balance : `)} RS: ${
        customer.bankAccount.accountBalance
      }`
    )
  );
  console.log(
    chalk.whiteBright(
      `${chalk.bgRgb(1, 59, 52)(`Account Number  : `)} ${
        customer.bankAccount.accountNumber
      }`
    )
  );
  console.log(chalk.whiteBright(`--------------------------------------`));
}

export function ShowAccountBalance(customer: Customer) {
  console.log(chalk.whiteBright(`--------------------------------------`));
  console.log(
    chalk.whiteBright(
      `${chalk.bgRgb(1, 59, 52)(`Account Balance : `)} RS: ${
        customer.bankAccount.accountBalance
      }`
    )
  );
  console.log(chalk.whiteBright(`--------------------------------------`));
}

export async function Credit(customer: Customer) {
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

export async function Debit(customer: Customer) {
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

export function TransactionHistory(customer: Customer) {
  if (!customer.bankAccount.transactionHistory.length) {
    console.log(` No Transaction Available`);
    return;
  }
  console.table(
    customer.bankAccount.transactionHistory.map((val) => {
      return { ...val, fee: `RS: ${val.fee}`, amount: `RS: ${val.amount}` };
    })
  );
}

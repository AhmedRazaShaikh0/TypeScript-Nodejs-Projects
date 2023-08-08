class BankAccount {
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
    let date = new Date().toISOString();
    this.accountBalance -= amount;
    this.transactionHistory.push({
      type: "Debit",
      amount: amount,
      date: date,
      fee: 0,
    });
  }

  Credit(amount: number) {
    let date = new Date().toISOString();
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

class Customer {
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

import inquirer from "inquirer";

const customers: Customer[] = [];

async function Choice() {
  const { option }: { option: "Create New Account" | "Sign In" } = await inquirer.prompt([
    {
      name: "option",
      message: "What Would You Like To Do?",
      type: "list",
      choices: ["Create New Account", "Sign In"],
    },
  ]);
  return option;
}

async function CreateNewAccount() {
  const { name, age, contactNumber, pin, userId } = await inquirer.prompt([
    { name: "name", message: "Enter Your Name:" },
    { name: "age", message: "Enter Your Age:", type: "number" },
    { name: "contactNumber", message: "Enter Contact Number:" },
    { name: "pin", message: "Enter Pin:", type: "number" },
    { name: "userId", message: "Enter UserID:" },
  ]);

  const customer = new Customer(name, age, contactNumber, pin, userId);
  customers.push(customer);
  console.log("Account Created Successfully");
}

async function SignIn() {
  const { userId, pin }: { userId: string; pin: number } =
    await inquirer.prompt([
      { name: "userId", message: "Enter Your UserID:" },
      { name: "pin", message: "Enter Your Pin:", type: "number" },
    ]);

  const customer = customers.find((val) => val.userId === userId);

  if (!customer) {
    console.log("No Customer With This UserID");
    return;
  } else {
    if (customer.pin !== pin) {
      console.log("Incorrect PIN");
      return;
    }
    console.log("Signed In Successfully");

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
            message: "Select One:",
            type: "list",
            choices: ["Perform Another Task", "Sign Out"],
          },
        ]);

      if (choice === "Sign Out") {
        break;
      }
    }
  }
}

function DisplayInfo(customer: Customer) {
  console.log("Name:", customer.name);
  console.log("Age:", customer.age);
  console.log("Contact Number:", customer.contactNumber);
  console.log("UserID:", customer.userId);
  console.log("Account Balance:", customer.bankAccount.accountBalance);
}

function ShowAccountBalance(customer: Customer) {
  console.log("Account Balance:", customer.bankAccount.accountBalance);
}

async function Credit(customer: Customer) {
  const { amount } = await inquirer.prompt([
    { name: "amount", message: "Enter Amount:", type: "number" },
  ]);

  if (!amount) {
    console.log("Enter Correct Amount");
    return;
  }

  customer.bankAccount.Credit(amount);
  console.log("Transaction Successful");
}

async function Debit(customer: Customer) {
  const { amount } = await inquirer.prompt([
    { name: "amount", message: "Enter Amount:", type: "number" },
  ]);

  if (!amount) {
    console.log("Enter Correct Amount");
    return;
  }

  if (amount > customer.bankAccount.accountBalance) {
    console.log("Amount is Greater than Your Balance");
    return;
  }

  customer.bankAccount.Debit(amount);
  console.log("Transaction Successful");
}

function TransactionHistory(customer: Customer) {
  if (!customer.bankAccount.transactionHistory.length) {
    console.log("No Transaction Available");
    return;
  }

  console.table(customer.bankAccount.transactionHistory);
}

async function main() {
  while (true) {
    const choice = await Choice();

    if (choice === "Create New Account") {
      await CreateNewAccount();
    } else if (choice === "Sign In") {
      await SignIn();
    }

    const input = await inquirer.prompt([
      {
        name: "exit",
        type: "confirm",
        message: "Do You Want To Exit?",
        default: false,
      },
    ]);

    if (input.exit) {
      break;
    }
  }
}

main();

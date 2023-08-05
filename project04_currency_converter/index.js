// import inquirer from "inquirer";
// interface CurrencyConversionType {
// 	PKR: {
// 		USD: number;
// 		GBP: number;
// 		PKR: number;
// 	};
// 	GBP: {
// 		USD: number;
// 		PKR: number;
// 		GBP: number;
// 	};
// 	USD: {
// 		PKR: number;
// 		GBP: number;
// 		USD: number;
// 	};
// }
// let convertion: CurrencyConversionType = {
// 	PKR: {
// 		USD: 0.004,
// 		GBP: 0.0037,
// 		PKR: 1,
// 	},
// 	GBP: {
// 		USD: 1.21,
// 		PKR: 350,
// 		GBP: 1,
// 	},
// 	USD: {
// 		PKR: 300,
// 		GBP: 0.83,
// 		USD: 1,
// 	},
// };
// interface InputType {
// 	from: "PKR" | "USD" | "GBP";
// 	to: "PKR" | "USD" | "GBP";
// 	amount: number;
// }
// const answers: {
// 	from: "PKR" | "USD" | "GBP";
// 	to: "PKR" | "USD" | "GBP";
// 	amount: number;
// } = await inquirer.prompt([
// 	{
// 		type: "list",
// 		name: "from",
// 		choices: ["PKR", "USD", "GBP"],
// 		message: "Select Your Currency",
// 	},
// 	{
// 		type: "list",
// 		name: "to",
// 		choices: ["PKR", "USD", "GBP"],
// 		message: "Select Your Currency",
// 	},
// 	{
// 		type: "number",
// 		name: "amount",
// 		message: "Enter quantity you are wanted to Convert",
// 	},
// ]);
// let { from, to, amount } = answers;
// if (from && to && amount) {
// 	let result = convertion[from][to] * amount;
// 	console.log(`Your conversion from ${from} to ${to} is ${result}`);
// } else {
// 	console.log("Enter Valid Inputs");
// }
// import inquirer from "inquirer";
// // const exchangeRates: any = {
// //   USD: 1, // 1 USD to PKR
// //   PKR: 280, // 1 PKR to USD
// //   EUR: 1.10, // 1 EUR to USD
// //   GBP: 0.74, // 1 GBP to USD
// // };
// let convertion = {
//   PKR: {
//     USD: 0.004,
//     GBP: 0.0037,
//     PKR: 1,
//   },
//   GBP: {
//     USD: 1.21,
//     PKR: 350,
//     GBP: 1,
//   },
//   USD: {
//     PKR: 300,
//     GBP: 0.83,
//     USD: 1,
//   },
// };
// async function main() {
//   const answers = await inquirer.prompt([
//     {
//       type: "number",
//       name: "amount",
//       message: "Enter the amount:",
//     },
//     {
//       type: "list",
//       name: "fromCurrency",
//       message: "Select the currency to convert from:",
//       choices: ["PKR", "USD", "EUR", "GBP"],
//     },
//     {
//       type: "list",
//       name: "toCurrency",
//       message: "Select the currency to convert to:",
//       choices: ["PKR", "USD", "EUR", "GBP"],
//     },
//   ]);
//   const { amount, fromCurrency, toCurrency } = answers;
//   const convertedAmount =
//     (amount * exchangeRates[toCurrency]) / exchangeRates[fromCurrency];
//   console.log(
//     `${amount} ${fromCurrency} is approximately ${convertedAmount} ${toCurrency}`
//   );
// }
// main();
import inquirer from "inquirer";
const conversionRates = {
    PKR: {
        USD: 0.0036,
        GBP: 0.0028,
        PKR: 1,
        EUR: 0.0032,
    },
    GBP: {
        USD: 1.27,
        PKR: 358,
        GBP: 1,
        EUR: 1.16,
    },
    USD: {
        PKR: 280,
        GBP: 0.78,
        USD: 1,
        EUR: 0.91,
    },
    EUR: {
        PKR: 310,
        GBP: 0.86,
        USD: 1.1,
        EUR: 1,
    },
};
// async function CurrencyConverter() {
const answers = await inquirer.prompt([
    {
        type: "list",
        name: "fromCurrency",
        message: "Select the currency to convert from:",
        choices: ["PKR", "USD", "GBP", "EUR"],
    },
    {
        type: "list",
        name: "toCurrency",
        message: "Select the currency to convert to:",
        choices: ["PKR", "USD", "GBP", "EUR"],
    },
    {
        type: "number",
        name: "amount",
        message: "Enter the amount to convert:",
    },
]);
const { amount, fromCurrency, toCurrency } = answers;
if (amount && fromCurrency && toCurrency) {
    const convertedAmount = amount * conversionRates[fromCurrency][toCurrency];
    console.log(`${amount} ${fromCurrency} is approximately ${convertedAmount} ${toCurrency}`);
}
else {
    console.log("Enter Valid Amount");
}
// }
// CurrencyConverter();

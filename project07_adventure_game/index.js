import inquirer from "inquirer";
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
const maxEnemyHealth = 75;
const enemyAttackDamage = 25;
let health = 100;
const attackDamage = 50;
let numHealthPotions = 3;
const healthPotionHealAmount = 30;
const healthPotionDropChance = 50;
console.log("Welcome to My Game!\n");
async function main() {
    while (true) {
        let enemyHealth = getRandomInt(maxEnemyHealth);
        let enemy = enemies[getRandomInt(enemies.length)];
        console.log(`\t# ${enemy} has Appeared! #\n`);
        while (enemyHealth > 0 && health > 0) {
            console.log(`\t Your HP: ${health}`);
            console.log(`\t ${enemy}'s HP: ${enemyHealth}`);
            const answer = await inquirer.prompt([
                {
                    type: "list",
                    name: "input",
                    message: "What would you like to do ? ",
                    choices: ["Attack", "Drink Health Potion", "Run!"],
                },
            ]);
            const { input } = answer;
            if (input === "Attack") {
                let damageDealt = getRandomInt(attackDamage);
                let damageTaken = getRandomInt(enemyAttackDamage);
                enemyHealth -= damageDealt;
                health -= damageTaken;
                console.log(`\t> You Strike the ${enemy} for ${damageDealt} Damage.`);
                console.log(`\t> You Recieve ${damageTaken} in Retaliation!`);
                if (health < 1) {
                    console.log("\t> You have taken too much Damage, you are too Weak to go on!");
                    break;
                }
            }
            else if (input === "Drink Health Potion") {
                if (numHealthPotions > 0) {
                    health += healthPotionHealAmount;
                    numHealthPotions--;
                    console.log(`\t> You drink a Health Potion, healing yourself for ${healthPotionHealAmount}`);
                    console.log(`\t> You now have ${health} HP.`);
                    console.log(`\t> You have ${numHealthPotions} Health Potions left.\n`);
                }
                else {
                    console.log("\t> You have no Health Potions Left! Defeat Enemies for a Chance to Get One!");
                }
            }
            else if (input === "Run!") {
                console.log(`\t You Run Away from the ${enemy}!\n`);
            }
            else {
                console.log("\tInvalid command!");
            }
        }
        if (health < 1) {
            console.log("\tYou limp out of the Dungeon, you are too Weak from Battle.");
            break;
        }
        console.log("--------------------------------------------------------------------");
        console.log(` # ${enemy} was Defeated! #`);
        console.log(` # You have ${health} HP left.`);
        if (getRandomInt(100) > healthPotionDropChance) {
            numHealthPotions++;
            console.log(` # the ${enemy} Dropped a Health Potion! #`);
            console.log(` # You now have ${numHealthPotions} Health Potion(s). #`);
        }
        console.log("--------------------------------------------------------------------");
        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "input",
                message: "What would you like to do now?",
                choices: ["Continue", "Exit"],
            },
        ]);
        const input = answer.input;
        if (input === "Continue") {
            console.log("You Continue on your Adventure\n");
        }
        else if (input === "Exit") {
            console.log("You Exit the Dungeon, Successful from your Adventures!\n");
            break;
        }
    }
    console.log("Thanks for playing");
}
main();

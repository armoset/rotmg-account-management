import 'dotenv/config'
import { AccountStore, AccountCreator } from "./logic";
import { Helper } from "./util/helper";

const args = process.argv.slice(2);
const amount = parseInt(args[0]);

main(amount)

async function main(amount: number) {
    const accountStore = new AccountStore();

    const catchAllDomain = process.env.CATCH_ALL_DOMAIN;
    if(!catchAllDomain){
        throw new Error("CATCH_ALL_DOMAIN not found");
    }

    console.log(`Creating ${amount} new accounts`);
    const accountCreator = new AccountCreator(catchAllDomain);

    for (let i = 0; i < amount; i++) {
        const account = await accountCreator.create();
        if(account){
            accountStore.add(account);
        }
        console.log(`Created account no. ${i}`);
        await Helper.delay(1000);
    }
    console.log("All accounts created");
    console.log("Please ensure to verify the emails before accessing the accounts");
    
    console.log(accountStore.getAll());
}
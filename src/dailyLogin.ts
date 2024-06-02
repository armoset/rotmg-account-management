import 'dotenv/config'
import { AccountStore } from "./logic";
import { DailyLogin } from "./logic/daily_login/daily_login";
import { Helper } from './util/helper';

main()

async function main() {
    const accountStore = new AccountStore();
    const dailyLogin = new DailyLogin();

    const accounts = accountStore.getAll();

    for(const account of accounts){
        console.log(`Logging in with ${account.username}`);
        await dailyLogin.doDaily(account);

        // 2 minute delay for deca reasons
        console.log("Waiting 2 minutes to avoid rate limits")
        await Helper.delay(2 * 60 * 1000)
    }
    console.log("All dailies done");
    console.log("Dont forget to claim them at the end of the month");
}
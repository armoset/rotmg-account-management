import 'dotenv/config'
import { AccountStore } from "./logic";
import { DailyLogin } from "./logic/daily_login/daily_login";

main()

async function main() {
    const accountStore = new AccountStore();
    const dailyLogin = new DailyLogin();

    const accounts = accountStore.getAll();

    for(const account of accounts){
        await dailyLogin.doDaily(account);
    }
}
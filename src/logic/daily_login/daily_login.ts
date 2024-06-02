import { Account, RotmgApiHttpService } from "../../util";

export class DailyLogin{
    private httpClient = new RotmgApiHttpService();

    public async doDaily(account: Account){
        const credentials = await this.httpClient.accountVerify(account);

        // ToDo: Actual Error Handling
        if(!credentials) return;

        const result = await this.httpClient.charList(credentials, true);
    }
}
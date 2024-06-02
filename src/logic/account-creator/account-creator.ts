import { Account, RotmgApiHttpService } from "../../util";
import { randomBytes } from 'crypto';

export class AccountCreator {
    constructor(private catchAllDomain: string){

    }
    
    private rotmgClient = new RotmgApiHttpService();

    public async create() : Promise<Account | null>{
        const account = new Account(
            this.createRandomString(10),
            `${this.createRandomString(8)}@${this.catchAllDomain}`,

            // Ensuring atleast one Capital, one lower case and one number exists
            this.createRandomString(16, true) + "Aa1",
        )
        const success = await this.rotmgClient.accountRegisterAsync(account);
        return success ? account : null;
    }

    private createRandomString(length: number, containsLetters: boolean = false){
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        if(containsLetters){
          characters += "0123456789"
        }

        const charactersLength = characters.length;
        const bytes = randomBytes(length);
    
        for (let i = 0; i < length; i++) {
            result += characters.charAt(bytes[i] % charactersLength);
        }
    
        return result;
    }
}
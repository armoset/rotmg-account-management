import * as fs from 'fs';
import * as path from 'path';
import { Account } from '../../util';

export class AccountStore {
    private readonly storageLocation = path.join(__dirname, "store.csv");
    private readonly accounts: Account[] = this.readStorage();

    public add(account: Account){
        this.accounts.push(account);

        fs.appendFileSync(this.storageLocation, `${account.username};${account.email};${account.password}\r\n`)
    }
    public getAll() : Account[]{
        return [...this.accounts];
    }

    private readStorage() : Account[] {
        if(!fs.existsSync(this.storageLocation)){
            fs.writeFileSync(this.storageLocation, "");
            return [];
        }
        const result : Account[] = [];

        const data = fs.readFileSync(path.join(this.storageLocation), 'utf8');

        const rows = data
            .split("\r\n")
            .filter(x => x);
        
        for(const row of rows){
            const accountData = row.split(';');
            const account = new Account(accountData[0], accountData[1], accountData[2]);
            result.push(account);
        }

        return result;
    }

}
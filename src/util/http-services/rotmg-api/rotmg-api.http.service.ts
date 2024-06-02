import { RotmgApiCredentials } from "..";
import { Account } from "../..";
import { Helper } from "../../helper";

export class RotmgApiHttpService {
    BASE_URL = "https://www.realmofthemadgod.com";
    private readonly accountVerifyAccessTokenRegex = /<AccessToken>([^<]*)<\/AccessToken>/;

    public async accountRegisterAsync(account: Account): Promise<boolean> {
        const data = new RegisterData(account.username, account.email, account.password);
        const url = `${this.BASE_URL}/account/register`;
        const formBody = Helper.toFormBody(data);

        const result = await fetch(url, {
            method: "POST",
            body: formBody,
            headers: this.headers
        });

        // ToDo: Assumes faulty request get rejected with a wrong http status
        // afaik they always return 200 or 204
        return result.ok;
    }

    public async accountVerify(account: Account) : Promise<RotmgApiCredentials| null> {
        const data = new AccountVerifyData(account.email, account.password);
        const url = `${this.BASE_URL}/account/verify`;
        const formBody = Helper.toFormBody(data);
    
        const result = await fetch(url, {
            method: "POST",
            body: formBody,
            headers: this.headers
        });

        const match = (await result.text()).match(this.accountVerifyAccessTokenRegex);

        return match ? new RotmgApiCredentials(match[1], data.clientToken): null;
    }

    public async charList(credentials: RotmgApiCredentials, doLogin = false) {
        const data = new IngameRequestData(credentials.accessToken, credentials.clientToken);
        let url = `${this.BASE_URL}/char/list`;
        if(doLogin){
            url+="?muledump=true&do_login=true"
        }

        const formBody = Helper.toFormBody(data);

        const result = await fetch(url, {
            method: "POST",
            body: formBody,
            headers: this.headers
        });
    }

    private readonly headers = {
        "User-Agent": "UnityPlayer/2021.3.16f1 (UnityWebRequest/1.0, libcurl/7.84.0-DEV)",
        Accept: "*/*",
        "Accept-Encoding": "deflate, gzip",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Unity-Version": "2021.3.16f1",
    }
}

class IngameRequestData{
    constructor(
        public readonly accessToken: string,
        public readonly clientToken: string
    ){ }
    [key: string]: string
    public readonly game_net = "Unity";
    public readonly play_platform = "Unity";
    public readonly game_net_user_id = "";
}

class AccountVerifyData {
    [key: string]: string

    constructor(
        email: string,
        password: string) {
        this.guid = email;
        this.password = password;
    }

    public readonly guid: string;
    public readonly password: string;
    public readonly game_net = "Unity";
    public readonly play_platform = "Unity";
    public readonly game_net_user_id = "";

    public readonly clientToken = Helper.generateSecureString();
}

class RegisterData {
    [key: string]: string

    constructor(username: string, email: string, password: string) {
        this.newGUID = email;
        this.name = username;
        this.newPassword = password;
    }

    public readonly newGUID: string;
    public readonly newPassword: string;
    public readonly name: string;

    public readonly isAgeVerified = "1";
    public readonly entrytag = "";
    public readonly signedUpKabamEmail = "0";
    public readonly game_net = "Unity";
    public readonly play_platform = "Unity";
    public readonly game_net_user_id = "";
}
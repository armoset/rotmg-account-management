import * as crypto from 'crypto';

export class Helper{
    public static generateSecureString(length: number = 40): string {
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
    }
    public static toFormBody(data: any){
        const formBodyProperties : string[] = [];
        for (var property of Object.keys(data)) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBodyProperties.push(encodedKey + "=" + encodedValue);
          }
          const formBody = formBodyProperties.join("&");
          return formBody;
    }
    
    public static async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
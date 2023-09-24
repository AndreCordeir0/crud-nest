import * as bcrypt from 'bcrypt';

export class HashUtils{
    private static readonly saltOrRounds = 10;

    static hashPassword(password:string):string{
        const hashedPassword = bcrypt.hashSync(password, HashUtils.saltOrRounds);
        return hashedPassword;
    }

    static async comparePassword(password:string, hash:string):Promise<boolean>{
        const result = await bcrypt.compare(password, hash);
        return result;
    }
}
export class HttpUtils {

    static extractTokenFromHeader(request:Request):string{
        const authorization:string = request.headers['authorization'];
        if(authorization){
            const [prefix, token] = authorization.split(' ');
            if(prefix === 'Bearer'){
                return token;
            }
        }
        return authorization;
    }
}

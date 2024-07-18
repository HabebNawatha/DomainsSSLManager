// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class User {
    constructor(public name: string, public email: string, public password: string, public id?: ObjectId) {};

    static forLogin(email: string, password: string) {
        return new User('', email, password);
    }
    static forSignUp(email : string, password:string,name:string){
        return new User(name, email, password);

    }

    static forUse(name:string, email: string) {
        return new User(name, email,'');
    }
}

export interface JwtPayload {
    userId: string;
    name: string;
    email: string;
    
}
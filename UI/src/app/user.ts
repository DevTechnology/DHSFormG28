import {Role} from './role';

export class User {
    constructor(
        public email: string,
        public id: string,
        public password: string,
        public first_name: string,
        public last_name: string,
        public role: Role,
        public authenticated: boolean,
        public jwt: string
    ) { }
}

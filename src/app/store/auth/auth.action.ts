import { ILogin } from "./auth.interface";


export namespace Auth {

    export class Registration {
        static readonly type = '[Auth] Registration';
        constructor(payload: any) {}
    }


    export class Login {
        static readonly type = '[Auth] Login';
        constructor(public payload: ILogin) {}
    }

    export class Logout {
        static readonly type = '[Auth] Logout';
        constructor() {}
    }

    export class RefreshSideBarORData {
        static readonly type = '[Auth] Refresh';
        constructor() {}
    }
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ISideNav {
    name: string;
    icon: string;
    route: string;
    routeLinkActive: string;
}

export interface IInvalidAuthData {
    message: string;
    statusCode: number;
}
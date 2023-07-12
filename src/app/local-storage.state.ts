

export class LocalStorageState {

    static setTokan(tokan: string): void {
        localStorage.setItem("tokan", JSON.stringify(tokan));
    }

    static get Tokan(): string {
        return JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("tokan"))))
    }

    static setUser(user: any): void {
        localStorage.setItem("user", JSON.stringify(user));
    }

    static get User(): any {
        return JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("user"))))
    }
    
}
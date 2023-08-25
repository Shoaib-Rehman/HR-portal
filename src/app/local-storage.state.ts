

export class LocalStorageState {

    static setTokan(tokan: string): void {
        localStorage.setItem("tokan", JSON.stringify(tokan));
    }

    static get Tokan(): string {
        return JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("tokan"))))
    }

    static setCurrentUser(user: any): void {
        localStorage.setItem("current-user", JSON.stringify(user));
    }

    static get User(): any {
        return JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("current-user"))))
    }

    static get CurrentUserRole(): string {
        return this.User?.role;
    }
    
}
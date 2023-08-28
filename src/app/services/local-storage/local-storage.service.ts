import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  constructor() {}

  setTokan(tokan: string): void {
    localStorage.setItem('tokan', JSON.stringify(tokan));
  }

  get Tokan(): string {
    return JSON.parse(
      JSON.parse(JSON.stringify(localStorage.getItem('tokan')))
    );
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('current-user', JSON.stringify(user));
  }

  get User(): any {
    return JSON.parse(
      JSON.parse(JSON.stringify(localStorage.getItem('current-user')))
    );
  }

  get CurrentUserRole(): string {
    return this.User?.role;
  }

  get CurrentUserId(): string {
    return this.User?.id;
  }

}

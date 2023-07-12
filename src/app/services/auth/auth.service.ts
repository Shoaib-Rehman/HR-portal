import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from 'src/app/store/auth/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(payload: ILogin): any {
    return "";
  }
}

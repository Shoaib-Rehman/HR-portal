import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from 'src/app/store/auth/auth.interface';
import { APIBasicConfig } from '../api-basic-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends APIBasicConfig {

  constructor(private http: HttpClient) {
    super();
   }

  login(payload: ILogin): any {
    return this.http.post(`${this.base_url}users/login`, payload);
  }
}

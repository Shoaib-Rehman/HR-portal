import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInvalidAuthData, ILogin } from 'src/app/store/auth/auth.interface';
import { APIBasicConfig } from '../api-basic-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends APIBasicConfig {

  constructor(private http: HttpClient) {
    super();
   }

  login(payload: ILogin): Observable<IInvalidAuthData> {
    return this.http.post<IInvalidAuthData>(`${this.base_url}users/login`, payload);
  }
}

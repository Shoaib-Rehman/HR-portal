import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { APIBasicConfig } from '../api-basic-config';
import { IAddEmployee, ILaunchAppraisal } from 'src/app/interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends APIBasicConfig {
  constructor(private http: HttpClient) {
    super();
  }

  getAllAgencies(): Observable<any> {
    return this.http.get(`${this.base_url}agency/getAgencies`);
  }

  addEmployee(formData: IAddEmployee): Observable<any> {
    return this.http.post(`${this.base_url}users/register`, formData);
  }

  getAllEmployee(): Observable<any> {
    return this.http.get(`${this.base_url}users`);
  }

  agencyEmployee(agencyId: any): Observable<any> {
    // not in use not confirmed
    return this.http.post(`${this.base_url}users/agencyEmployee`, agencyId);
  }

  launchAppriasal(formData: ILaunchAppraisal): Observable<any> {
    // not in use not confirmed
    return this.http.post(`${this.base_url}users/launchApprisal`, formData);
  }

  
}

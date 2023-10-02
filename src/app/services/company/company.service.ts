import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  editEmployee(formData: IAddEmployee): Observable<any> {
    return this.http.put(`${this.base_url}users/${formData?.id}`, formData);
  }

  getAllEmployee(): Observable<any> {
    return this.http.get(`${this.base_url}users`);
  }

  getAllEmployeeWhoDoneApprisal(data:any): Observable<any> {
    return this.http.get(`${this.base_url}users?page=1&limit=10&isCompleted=true`);
  }

  agencyEmployee(agencyId: any): Observable<any> {
    return this.http.get(
      `${this.base_url}agency/getAgencyEmployees/${agencyId?.id}`
    );
  }

  launchAppriasal(formData: ILaunchAppraisal): Observable<any> {
    return this.http.post(`${this.base_url}users/launchAppraisal`, formData);
  }
  launchSelfApriasal(formData: any): Observable<any> {
    return this.http.post(
      `${this.base_url}users/selfAnnualAppraisal`,
      formData
    );
  }

  getSelfApriasal(userId: number): Observable<any> {
    return this.http.get(
      `${this.base_url}users/getUserAppraisalDetail/${userId}`
    );
  }

  launchCompetencyApriasal(formData: any): Observable<any> {
    return this.http.post(`${this.base_url}users/annualAppraisal`, formData);
  }

  GetCompetencyApriasal(userId: number): Observable<any> {
    return this.http.get(
      `${this.base_url}users/getUserAnnualAppraisalDetail/${userId}`
    );
  }

  launchNextYearApriasal(formData: any): Observable<any> {
    return this.http.post(
      `${this.base_url}users/addUserNextYearObjective`,
      formData
    );
  }

  GetNextYearApriasal(userId: number): Observable<any> {
    return this.http.get(
      `${this.base_url}users/getUserNextYearDetail/${userId}`
    );
  }

  getMembers(data: any): Observable<any> {
    return this.http.get(
      `${this.base_url}users/getEmployeesAgainstManager/${data?.agencyId}/${data?.managerId}/${data?.status}`
    );
  }

  assignMembers(data: any): Observable<any> {
    return this.http.post(
      `${this.base_url}users/employeesAssignstoManager`,
      data
    );
  }

  downloadPDF(userId: number) {
    window.open(`${this.base_url}users/getReportFile/${userId}`, '_blank');
  }
  

  getAllMembersWhoDoneAppraisal(agencyId: number): Observable<any> {
    return this.http.get(
      `${this.base_url}users/getAgencyCompleteAppraisalScore/${agencyId}`
    );
  }
}

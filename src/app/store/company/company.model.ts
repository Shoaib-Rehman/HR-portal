import { IMember } from "src/app/interface";
import { IUser } from "./company.interface";

export class CompanyModel {
    agenciesList: [] = [];
    allemployeeList: [] = [];
    agencyemployeeList: IMember[] = [];
    ApprisalDetails: [] = [];
    managerEmployeeList: [] = [];
    userId:IUser = JSON.parse(localStorage.getItem('current-user')  || '{}');
    AllMemberWhoDoneApprisal: IMember[] = [];

}
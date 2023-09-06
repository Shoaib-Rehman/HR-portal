import { IUser } from "./company.interface";

export class CompanyModel {
    agenciesList: [] = [];
    allemployeeList: [] = [];
    agencyemployeeList: [] = [];
    ApprisalDetails: [] = [];
    userId:IUser = JSON.parse(localStorage.getItem('current-user')  || '{}')
}
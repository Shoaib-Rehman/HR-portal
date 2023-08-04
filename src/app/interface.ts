// Here create global types

export interface IGetAll {
  skip: number;
  search: string;
  numberPerPage: string;
}

export interface IMember {
  name: string;
  position: string;
  location: string;
  status: string;
  agency?:string;
}

export interface IAddEmployee {
  agency: string;
  location: any;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfJoining: string;
  role: string;
  email: string;
  designation: string;
}

export interface ILaunchAppraisal {
  year:string;
  appraisalType:string;
  employee?:string;
  company?:string;
}

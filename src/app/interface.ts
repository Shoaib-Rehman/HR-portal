// Here create global types

export interface IGetAll {
  skip: number;
  search: string;
  numberPerPage: string;
}

export interface IMember {
  name?: string;
  position?: string;
  status?: string;
  agency?: string;
  dateOfJoining?: string;
  designation?: string;
  email?: string;
  firstName?: string;
  id?: string;
  lastName?: string;
  location?: string;
  middleName?: string;
  password?: string;
  password_encry?: string;
  phoneNo?: string;
  role?: string;
}

export interface IAddEmployee {
  agency: string;
  id?: number;
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
  year: string;
  appraisalType?: string;
  employee?: IAddEmployee;
  company?: IAgency;
  subject?: string;
  emailDescription?: string;
}

export interface IAgency {
  agencyId?: string;
  id?: number;
  location?: string;
  name?: string;
}

export interface ISideBar {
  name: string;
  icon: string;
  route: string;
  routeLinkActive: string;
}

export interface IGraph {
  x: string;
  y: number;
}
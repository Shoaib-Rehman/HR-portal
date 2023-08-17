
import { IAddEmployee, IGetAll, ILaunchAppraisal } from "src/app/interface";
import { ICompany } from "./company.interface";

export namespace Company {

    export class Create {
        static readonly type = '[Company] Create';
        constructor(public payload: ICompany) {}
    }

    export class Update {
        static readonly type = '[Company] Update';
        constructor(public payload: ICompany) {}
    }

    export class Delete {
        static readonly type = '[Company] Delete';
        constructor(public id: number) {}
    }

    export class GetAll {
        static readonly type = '[Company] GetAll';
        constructor() {}
    }

    export class GetSingleAgencyEmployee {
      
        static readonly type = '[Company] GetSingleAgencyEmployee';
        constructor(public payload: any) {}
    }

    export class addEmployee {
        static readonly type = '[Company] addEmployee' ;
        constructor(public payload:IAddEmployee) {}
    }

    export class GetAllEmployee {
        static readonly type = '[Company] GetAllEmployee' ;
        constructor() {}
    }

    export class launchAppriasal {
        static readonly type = '[Company] launchAppriasal' ;
        constructor(public payload:ILaunchAppraisal) {}
    }


}
import { IGetAll } from "src/app/interface";
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
        constructor(public payload: IGetAll) {}
    }

    export class GetSingle {
        static readonly type = '[Company] GetSingle';
        constructor(public id: number) {}
    }


}
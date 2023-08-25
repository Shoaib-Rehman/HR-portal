import { LocalStorageState } from "../local-storage.state";


export class Permission {
    static canSee(moduleName: string): boolean {
        const role: string = LocalStorageState.CurrentUserRole;
        const members: string[] = ['Self Annual Appraisal', 'Annual Appraisal'];
        const managers: string[] = ['Self Annual Appraisal', 'Annual Appraisal', ];
        
        if (role === "HR" || role === "CEO") {
            return true;
        } 

        return false;

    }
}
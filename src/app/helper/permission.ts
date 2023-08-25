import { ROLE } from "../constant";
import { LocalStorageState } from "../local-storage.state";


export class Permission {
    static canSee(moduleName: string): boolean {
        const role: string = LocalStorageState.CurrentUserRole;
        const members: string[] = ['Self Annual Appraisal', 'Annual Appraisal', 'Next Year Objectives'];
        const managers: string[] = ['Self Annual Appraisal', 'Annual Appraisal', 'Next Year Objectives', 'Assign Members'];
        
        if (role === ROLE.HR || role === ROLE.CEO) {
            return true;
        } 

        if (role === ROLE.MEMBER) {
            return members.some((member: string) => member === moduleName);
        }

        if (role === ROLE.MANAGER) {
            return managers.some((manager: string) => manager === moduleName);
        }

        return false;

    }
}
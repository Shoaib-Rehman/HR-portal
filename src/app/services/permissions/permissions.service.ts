import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ROLE } from 'src/app/constant';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private localStorage: LocalStorageService) { }

  canSee(moduleName: string): boolean {
    const role: string = this.localStorage.CurrentUserRole;
    const members: string[] = ['Apprisal', 'Annual Appraisal', 'Next Year Objectives'];
    const managers: string[] = ['Apprisal', 'Annual Appraisal', 'Next Year Objectives', 'Assign Members'];
    const HR: string[] = ['Agency Member List', 'Launch Appraisal', 'All Employee List', 'Appraisal Results','Calibration','Bell Cruve'];
    const CEO: string[] = ['Assign Members']; 
    
    if (role === ROLE.HR) {
      return HR.some((member: string) => member === moduleName);

        // return true;
    } 
    if(role === ROLE.CEO) {
      return CEO.some((member: string) => member === moduleName);

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

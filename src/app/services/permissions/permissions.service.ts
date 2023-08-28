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

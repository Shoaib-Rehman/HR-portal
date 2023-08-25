import { ISideBar } from "../interface";

export class SideBarData {
     static data: ISideBar[] = [
        {
          name: 'Agency Member List',
          icon: 'person',
          route: '/dashboard',
          routeLinkActive: 'active',
        },
        {
          name: 'Add Employee',
          icon: 'commute',
          route: '/employee',
          routeLinkActive: 'active',
        },
        {
          name: 'Launch Appraisal',
          icon: 'commute',
          route: '/launch-appraisal',
          routeLinkActive: 'active',
        },
        {
          name: 'Self Annual Appraisal',
          icon: 'commute',
          route: '/self-appraisal',
          routeLinkActive: 'active',
        },
        {
          name: 'Annual Appraisal',
          icon: 'commute',
          route: '/annual-appraisal',
          routeLinkActive: 'active',
        },
        {
          name: 'All Employee List',
          icon: 'commute',
          route: '/all-employee',
          routeLinkActive: 'active',
        },
        {
          name: 'Appraisal Results',
          icon: 'commute',
          route: '/employee',
          routeLinkActive: 'active',
        },
        {
          name: 'Calibration',
          icon: 'settings',
          route: '/dashboard',
          routeLinkActive: 'active',
        },
        {
          name: 'Bell Cruve',
          icon: 'home',
          route: '/bell-curve',
          routeLinkActive: 'active',
        },
      ];
}
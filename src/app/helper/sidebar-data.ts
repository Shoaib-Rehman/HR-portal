import { ISideBar } from "../interface";

export class SideBarData {

     static data: ISideBar[] = [
      {
        name: 'Agency Member List',
        icon: 'person',
        route: '/dashboard',
        routeLinkActive: 'active',
      },
      // {
      //   name: 'Add Employee',
      //   icon: 'commute',
      //   route: '/employee',
      //   routeLinkActive: 'active',
      // },
      {
        name: 'Launch Appraisal',
        icon: 'rocket_launch',
        route: '/launch-appraisal',
        routeLinkActive: 'active',
      },
    
      {
        name: 'All Employee List',
        icon: 'supervised_user_circle',
        route: '/all-employee',
        routeLinkActive: 'active',
      },
      // {
      //   name: 'Compose Email',
      //   icon: 'commute',
      //   route: '/compose-email',
      //   routeLinkActive: "active"
      // },
    
      {
        name: 'Apprisal',
        icon: 'assignment_ind',
        route: '/self-appraisal',
        routeLinkActive: "active"
      },
      {
        name: 'Assign Members',
        icon: 'work_history',
        route: '/assign-members',
        routeLinkActive: "active"
      },
      // {
      //   name: 'Annual Appraisal',
      //   icon: 'view_timeline',
      //   route: '/annual-appraisal',
      //   routeLinkActive: "active"
      // },
      // {
      //   name: 'Next Year Objectives',
      //   icon: 'perm_contact_calendar',
      //   route: '/next-year-objective',
      //   routeLinkActive: "active"
      // },
      {
        name: 'Appraisal Results',
        icon: 'wysiwyg',
        route: '/employee',
        routeLinkActive: 'active',
      },
      {
        name: 'Calibration',
        icon: 'square_foot',
        route: '/calibration',
        routeLinkActive: 'active',
      },
      {
        name: 'Bell Cruve',
        icon: 'timeline',
        route: '/bell-curve',
        routeLinkActive: 'active',
      },
    ];
}
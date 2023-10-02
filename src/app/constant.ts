// Here create global constants

export const ERROR = {
  REQUIRED: {
    EMAIL: 'Please enter Email',
    PASSWORD: 'Please enter Password',
    AGENCY_NAME: 'Please enter Agency Name',
  },
  NOT_VALID: {
    EMAIL: 'Not a valid Email',
    PASSWORD: 'Not a valid Password',
    AGENCY_NAME: 'Not a valid Agency Name',
  },
};

export const ROLE = {
  HR: 'HR',
  CEO: 'CEO',
  MEMBER: 'Member',
  MANAGER: 'Manager',
};

export const MEMBER_CATEGORY = {
  INADEQUATE: 'Inadequate',
  ADEQUATE: 'Adequate',
  SATISFACTORY: 'Satisfactory',
  GOOD: 'Good',
  EXCELENT: 'Excelent',
};

export const MEMBER_STATUS = {
  INADEQUATE: 5,
  ADEQUATE: 4,
  SATISFACTORY: 3,
  GOOD: 2,
  EXCELENT: 1,
};

export const MEMBER_STATUSES = [
  {
    label: 'Inadequate',
    value: 5,
  },
  {
    label: 'Adequate',
    value: 4,
  },
  {
    label: 'Satisfactory',
    value: 3,
  },
  {
    label: 'Good',
    value: 2,
  },
  {
    label: 'Excelent',
    value: 1,
  },
];

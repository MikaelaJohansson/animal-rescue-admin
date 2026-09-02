export const permissions = {
  admin: {
    canViewDashboard: true,
    canViewAnimals: true,
    canAddAnimal: true,
    canEditAnimal: true,
    canDeleteAnimal: true,
    canViewMedicalHistory: true,
    canEditMedicalHistory: false,
    canViewApplications: true,
    canManageApplications: true,
    canApproveAdoption: false,
    canViewCalendar: true,
    canManageOwnCalendarEvents: true
  },

  manager: {
    canViewDashboard: true,
    canViewAnimals: true,
    canAddAnimal: false,
    canEditAnimal: false,
    canDeleteAnimal: false,
    canViewMedicalHistory: true,
    canEditMedicalHistory: false,
    canViewApplications: true,
    canManageApplications: false,
    canApproveAdoption: true,
    canViewCalendar: true,
    canManageOwnCalendarEvents: true
  },

  staff: {
    canViewDashboard: true,
    canViewAnimals: true,
    canAddAnimal: false,
    canEditAnimal: false,
    canDeleteAnimal: false,
    canViewMedicalHistory: true,
    canEditMedicalHistory: false,
    canViewApplications: true,
    canManageApplications: false,
    canApproveAdoption: false,
    canViewCalendar: true,
    canManageOwnCalendarEvents: true
  },

  veterinarian: {
    canViewDashboard: true,
    canViewAnimals: true,
    canAddAnimal: false,
    canEditAnimal: false,
    canDeleteAnimal: false,
    canViewMedicalHistory: true,
    canEditMedicalHistory: true,
    canViewApplications: false,
    canManageApplications: false,
    canApproveAdoption: false,
    canViewCalendar: true,
    canManageOwnCalendarEvents: true
  },

  volunteer: {
    canViewDashboard: true,
    canViewAnimals: true,
    canAddAnimal: false,
    canEditAnimal: false,
    canDeleteAnimal: false,
    canViewMedicalHistory: true,
    canEditMedicalHistory: false,
    canViewApplications: false,
    canManageApplications: false,
    canApproveAdoption: false,
    canViewCalendar: true,
    canManageOwnCalendarEvents: true
  }
};
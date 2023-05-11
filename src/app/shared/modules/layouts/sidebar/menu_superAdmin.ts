import { MenuItem } from './menu.model';
export const MENU_SUPERADMIN: MenuItem[] = [
  {
    label: 'Users',
    isTitle: true,
  },
  {
    label: 'Admins',
    icon: 'user',
    subItems: [
      {
        label: 'List of admins',
        link: '/admins',
      },
      {
        label: 'Add admin',
        link: '/admins/add',
      },
    ],
  },

  {
    label: 'Settings',
    isTitle: true,
  },
  {
    label: 'Settings',
    icon: 'settings',
    subItems: [
      {
        label: 'Change password',
        link: '/user/update-password',
      },
      {
        label: 'Update profile',
        link: '/user/profile',
      },
    ],
  },
];

import { MenuItem } from './menu.model';
export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true,
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard',
  },
  {
    label: 'Trucks',
    isTitle: true,
  },
  {
    label: 'Trucks',
    icon: 'truck',
    subItems: [
      {
        label: 'List of trucks',
        link: '/trucks',
      },
      {
        label: 'Add truck',
        link: '/trucks/add',
      },
    ],
  },
  {
    label: 'Truck tracking',
    icon: 'map',
    link: '/trucks/tracking',
  },

  {
    label: 'Drivers',
    isTitle: true,
  },
  {
    label: 'Drivers',
    icon: 'user',
    subItems: [
      {
        label: 'List of drivers',
        link: '/drivers',
      },
      {
        label: 'Add driver',
        link: '/drivers/driver',
      },
    ],
  },

  {
    label: 'Missions',
    isTitle: true,
  },
  {
    label: 'Missions',
    icon: 'activity',
    subItems: [
      {
        label: 'List of missions',
        link: '/missions',
      },
      {
        label: 'Add mission',
        link: '/missions/mission',
      },
      {
        label: 'Mission history',
        link: '/missions/history',
      },
      // {
      //   label: 'Mission tracking',
      //   link: '/missions/tracking',
      // },
    ],
  },
  {
    label: 'View in map',
    icon: 'map',
    link: '/missions/tracking',
  },
  {
    label: 'Clients',
    icon: 'users',
    subItems: [
      {
        label: 'List of clients',
        link: '/clients',
      },
      {
        label: 'Add client',
        link: '/clients/client',
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

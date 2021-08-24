export const listMenu = {
  dashboard: {
    nextScreen: 'Activity',
    menu: [
      {title: 'Revenue', api: '/get-number'},
      {title: 'A1', api: '/get-number'},
      {title: 'N1', api: '/get-number'},
      {title: 'PU', api: '/get-number'},
      {title: 'CCU', api: '/get-number'},
    ],
  },
  account: {
    nextScreen: 'ReportChart',
    menu: [
      {title: 'New & Active', api: '/laviuda/action'},
      {title: 'Platforms', api: '/get-number'},
      {title: 'Distributor', api: '/get-number'},
      {title: 'Account Type', api: '/get-number'},
      {title: 'App Version', api: '/get-number'},
    ],
  },
  device: {
    nextScreen: 'ReportChart',
    menu: [
      {title: 'New & Active', api: '/get-number'},
      {title: 'Platforms', api: '/get-number'},
      {title: 'Distributor', api: '/get-number'},
      {title: 'Account Type', api: '/get-number'},
      {title: 'App Version', api: '/get-number'},
    ],
  },
  mainReports: {
    nextScreen: 'ReportMenu',
    menu: [
      {title: 'Account', menuId: 'account'},
      {title: 'Device', menuId: 'device'},
      {title: 'Install-Open'},
      {title: 'Quality'},
      {title: 'Monthly'},
      {title: 'Hourly'},
      {title: 'GameReports'},
    ],
  },
};

export const FINGER_PRINT = 'fingerprint';
export const USER_TOKEN = 'user_token';
export const USER_INFO = 'user_info';
export const EXPIRY = 2;

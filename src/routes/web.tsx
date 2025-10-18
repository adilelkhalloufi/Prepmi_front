import { join } from "path";

export const webRoutes = {
  home: '/',
  login: '/login',
  logout: '/logout',
  register: '/register',
  checkout: '/checkout',
  dashboard: '/dashboard',
  dashboard_menus: '/dashboard/menus',
  dashboard_meals: '/dashboard/meals',
  dashboard_meals_add: '/dashboard/meals/add',
  dashboard_meals_edit: '/dashboard/meals/edit/:id',
  dashboard_meals_view: '/dashboard/meals/view/:id',
  dashboard_weekly_menus: '/dashboard/weekly-menus',
  dashboard_weekly_menus_add: '/dashboard/weekly-menus/add',
  dashboard_weekly_menus_edit: '/dashboard/weekly-menus/edit/:id',
  dashboard_weekly_menus_view: '/dashboard/weekly-menus/view/:id',
  dashboard_users: '/dashboard/users',
  dashboard_users_add: '/dashboard/users/add',
  dashboard_users_edit: '/dashboard/users/edit/:id',
  dashboard_users_view: '/dashboard/users/view/:id',

  menu: '/menu',
  join_now: '/join-now',
  single_product: '/product/:id',
  privacy_policy: '/privacy-policy',
  terms_service: '/terms-of-service',
  cookie_settings: '/cookie-settings',


};

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
  dashboard_weekly_plans: '/dashboard/weekly-plans',
  dashboard_weekly_plans_add: '/dashboard/weekly-plans/add',
  dashboard_weekly_plans_edit: '/dashboard/weekly-plans/edit/:id',
  dashboard_weekly_menus: '/dashboard/weekly-menus',
  dashboard_weekly_menus_add: '/dashboard/weekly-menus/add',
  dashboard_weekly_menus_edit: '/dashboard/weekly-menus/edit/:id',
  dashboard_weekly_menus_view: '/dashboard/weekly-menus/view/:id',
  menu: '/menu',
  join_now: '/join-now',
  single_product: '/product/:id',
  privacy_policy: '/privacy-policy',
  terms_service: '/terms-of-service',
  cookie_settings: '/cookie-settings',


};

import { API_URL } from '../utils';

export const apiRoutes = {
  // ... other routes ...
  login: `${API_URL}/login`,
  logout: `${API_URL}/logout`,
  register: `${API_URL}/register`,
  categories: `${API_URL}/categories`,
  users: `${API_URL}/users`,
  meals: `${API_URL}/meals`,
  menus: `${API_URL}/menus`,
  orders: `${API_URL}/orders`,
  plans: `${API_URL}/plans`,
  totalPointsEarned: `${API_URL}/total-points-earned`,

  weeklyMenus: `${API_URL}/weekly-menus`,
  menuMeals: `${API_URL}/menu-meals`,
  mealPreparations: `${API_URL}/meal-preparations`,

};

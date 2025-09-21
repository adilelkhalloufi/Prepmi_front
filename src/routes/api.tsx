import { API_URL } from '../utils';

export const apiRoutes = {
  // ... other routes ...
  login: `${API_URL}/login`,
  logout: `${API_URL}/logout`,
  register: `${API_URL}/register`,
  users: `${API_URL}/user`,
  GetProducts: `${API_URL}/products`,
  product: `${API_URL}/product`,
  categories: `${API_URL}/categorie`,
  unites: `${API_URL}/unites`,
  specialities: `${API_URL}/specialities`,
  orders : `${API_URL}/orders`,
  favoris : `${API_URL}/favoris`,
  GetOrderForSeller : `${API_URL}/GetOrderForSeller`,
  GetCoins : `${API_URL}/GetCoins`,
  spend_coins : `${API_URL}/spend-coins`,
  
};

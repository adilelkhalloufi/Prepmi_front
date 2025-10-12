import { WeeklyMenu, WeeklyMenuFormData, MenuMealFormData } from '@/types/weeklyMenu';

const API_BASE = process.env.REACT_APP_API_URL || '/api';

export class WeeklyMenuService {
  private static async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Weekly Menu CRUD
  static async getWeeklyMenus(params?: {
    page?: number;
    per_page?: number;
    is_active?: boolean;
    is_published?: boolean;
    current_week?: boolean;
  }): Promise<{ data: WeeklyMenu[]; meta: any }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return this.request(`/weekly-menus?${queryParams}`);
  }

  static async getWeeklyMenu(id: number): Promise<WeeklyMenu> {
    return this.request(`/weekly-menus/${id}`);
  }

  static async createWeeklyMenu(data: WeeklyMenuFormData): Promise<WeeklyMenu> {
    return this.request('/weekly-menus', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateWeeklyMenu(id: number, data: Partial<WeeklyMenuFormData>): Promise<WeeklyMenu> {
    return this.request(`/weekly-menus/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteWeeklyMenu(id: number): Promise<void> {
    return this.request(`/weekly-menus/${id}`, {
      method: 'DELETE',
    });
  }

  static async publishWeeklyMenu(id: number): Promise<WeeklyMenu> {
    return this.request(`/weekly-menus/${id}/publish`, {
      method: 'PATCH',
    });
  }

  static async unpublishWeeklyMenu(id: number): Promise<WeeklyMenu> {
    return this.request(`/weekly-menus/${id}/unpublish`, {
      method: 'PATCH',
    });
  }

  // Menu Meal Operations
  static async addMealToMenu(weeklyMenuId: number, data: MenuMealFormData): Promise<any> {
    return this.request(`/weekly-menus/${weeklyMenuId}/meals`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateMenuMeal(id: number, data: Partial<MenuMealFormData>): Promise<any> {
    return this.request(`/menu-meals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async removeMealFromMenu(id: number): Promise<void> {
    return this.request(`/menu-meals/${id}`, {
      method: 'DELETE',
    });
  }

  static async reorderMenuMeals(weeklyMenuId: number, mealIds: number[]): Promise<void> {
    return this.request(`/weekly-menus/${weeklyMenuId}/reorder-meals`, {
      method: 'PATCH',
      body: JSON.stringify({ meal_ids: mealIds }),
    });
  }
}

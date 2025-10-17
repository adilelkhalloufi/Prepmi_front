# Weekly Menus Management System

## Overview
Complete weekly menu management system inspired by the meals implementation, featuring full CRUD operations, meal association, and advanced filtering.

## Files Created

### 1. `/src/pages/dashboard/weekly-menus/index.tsx`
- Main list view for weekly menus
- Displays all menus with pagination
- Includes filtering and search functionality
- Delete functionality with confirmation

### 2. `/src/pages/dashboard/weekly-menus/columns.tsx`
- Table column definitions
- Displays: title, period, meal count, status, availability
- Actions: view, edit, delete
- Sortable columns with badges and status indicators

### 3. `/src/pages/dashboard/weekly-menus/data-table.tsx`
- Reusable data table component
- Features:
  - Search by title
  - Status filtering (all, published, draft, active)
  - Column visibility toggle
  - Pagination
  - Empty state with icon
  - Loading skeleton

### 4. `/src/pages/dashboard/weekly-menus/add.tsx`
- Create new weekly menu
- Two-tab interface:
  - **Details**: Title, dates, description, active/published switches
  - **Meals**: Add meals with drag-drop ordering, special pricing, availability management
- Modal for meal selection with search
- Features per meal:
  - Featured toggle (star)
  - Special price override
  - Availability count
  - Position ordering

### 5. `/src/pages/dashboard/weekly-menus/edit.tsx`
- Edit existing weekly menu
- Same features as add page
- Pre-loads existing data
- Shows sold count vs availability
- Updates meal associations

### 6. `/src/pages/dashboard/weekly-menus/view.tsx`
- Detailed view of weekly menu
- Dashboard with statistics:
  - Total meals
  - Featured meals count
  - Total availability
  - Sales percentage with progress bar
- Detailed meal cards showing:
  - Price (original vs special)
  - Availability and sold counts
  - Remaining stock
  - Sales progression
  - Badges (featured, special price, out of stock, low stock)
- Meta information (published date, created, updated)

## Updated Files

### `/src/interfaces/admin.tsx`
Added two new interfaces:
```typescript
export interface MenuMeal {
    id?: number
    weekly_menu_id: number
    meal_id: number
    position: number
    is_featured: boolean
    special_price?: number | null
    availability_count?: number
    sold_count?: number
    created_at?: string
    updated_at?: string
    meal?: Meal
}

export interface WeeklyMenu {
    id?: number
    week_start_date: string
    week_end_date: string
    title: string
    description?: string | null
    is_active: boolean
    is_published: boolean
    published_at?: string | null
    created_by?: number
    created_at?: string
    updated_at?: string
    meals?: MenuMeal[]
}
```

### `/src/routes/api.tsx`
Added API endpoints:
```typescript
weeklyMenus: `${API_URL}/weekly-menus`,
menuMeals: `${API_URL}/menu-meals`,
```

### `/src/routes/web.tsx`
Added routes:
```typescript
dashboard_weekly_menus: '/dashboard/weekly-menus',
dashboard_weekly_menus_add: '/dashboard/weekly-menus/add',
dashboard_weekly_menus_edit: '/dashboard/weekly-menus/edit/:id',
dashboard_weekly_menus_view: '/dashboard/weekly-menus/view/:id',
```

## Features Implemented

### 1. **Complete CRUD Operations**
- ✅ List all weekly menus
- ✅ Create new menu
- ✅ Edit existing menu
- ✅ View menu details
- ✅ Delete menu

### 2. **Meal Management**
- ✅ Add meals to menu via modal selection
- ✅ Remove meals from menu
- ✅ Reorder meals (position)
- ✅ Mark meals as featured
- ✅ Set special pricing per menu
- ✅ Manage availability counts
- ✅ Track sold counts

### 3. **Filtering & Search**
- ✅ Search by title
- ✅ Filter by status (published, draft, active)
- ✅ Sort by date, title
- ✅ Column visibility toggle

### 4. **Status Management**
- ✅ Active/Inactive toggle
- ✅ Published/Draft toggle
- ✅ Availability status (current, upcoming, finished)
- ✅ Published date tracking

### 5. **UI/UX Features**
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Success notifications
- ✅ Confirmation dialogs
- ✅ Empty states
- ✅ Badge indicators
- ✅ Progress bars
- ✅ Icon integration

### 6. **Data Visualization**
- ✅ Statistics dashboard
- ✅ Sales progression
- ✅ Stock status badges
- ✅ Featured meal indicators
- ✅ Price comparison (original vs special)

## Dependencies Used
- `@tanstack/react-table` - Data table
- `date-fns` - Date formatting
- `lucide-react` - Icons
- `@tabler/icons-react` - Additional icons
- All shadcn/ui components (Button, Card, Input, Badge, etc.)

## Integration Points

### Backend API Expected Endpoints
```
GET    /api/weekly-menus          - List all menus
POST   /api/weekly-menus          - Create menu
GET    /api/weekly-menus/:id      - Get single menu
PUT    /api/weekly-menus/:id      - Update menu
DELETE /api/weekly-menus/:id      - Delete menu
```

### Request/Response Format
**Create/Update Request:**
```json
{
  "title": "Menu de la semaine",
  "description": "Description",
  "week_start_date": "2025-10-20",
  "week_end_date": "2025-10-26",
  "is_active": true,
  "is_published": false,
  "meals": [
    {
      "meal_id": 1,
      "position": 1,
      "is_featured": true,
      "special_price": 12.99,
      "availability_count": 50
    }
  ]
}
```

## Next Steps

1. **Add router configuration** - Add routes to your main router
2. **Install missing dependencies** if any:
   ```bash
   npm install date-fns
   ```
3. **Add Progress component** if not exists (check `src/components/ui/progress.tsx`)
4. **Test API integration** with your Laravel backend
5. **Add drag-and-drop** library for meal reordering (optional):
   ```bash
   npm install @dnd-kit/core @dnd-kit/sortable
   ```

## Design Patterns Used
- Component composition (from meals)
- Controlled forms
- State management with useState
- Effect hooks for data fetching
- Reusable table component
- Modal dialogs for selection
- Tab-based navigation
- Progress indicators
- Badge-based status system

This implementation follows the exact same patterns as your meals system, ensuring consistency across your dashboard!

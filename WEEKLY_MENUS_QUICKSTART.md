# Weekly Menus - Quick Start Guide

## ✅ Created Files
All files have been successfully created in `/src/pages/dashboard/weekly-menus/`:

1. ✅ `index.tsx` - Main list view
2. ✅ `columns.tsx` - Table column definitions
3. ✅ `data-table.tsx` - Reusable data table
4. ✅ `add.tsx` - Create new menu
5. ✅ `edit.tsx` - Edit existing menu
6. ✅ `view.tsx` - View menu details

## ✅ Updated Files
1. ✅ `/src/interfaces/admin.tsx` - Added `WeeklyMenu` and `MenuMeal` interfaces
2. ✅ `/src/routes/api.tsx` - Added API endpoints
3. ✅ `/src/routes/web.tsx` - Added web routes

## 📦 Required Dependencies
All dependencies are already installed:
- ✅ `@tanstack/react-table`
- ✅ `date-fns`
- ✅ `lucide-react`
- ✅ `@tabler/icons-react`
- ✅ All shadcn/ui components

## 🔧 Next Steps

### 1. Add Routes to Your Router
You need to add these routes to your main router file (likely in `/src/routes/` or `/src/App.tsx`):

```tsx
import WeeklyMenusIndex from '@/pages/dashboard/weekly-menus/index'
import AddWeeklyMenu from '@/pages/dashboard/weekly-menus/add'
import EditWeeklyMenu from '@/pages/dashboard/weekly-menus/edit'
import ViewWeeklyMenu from '@/pages/dashboard/weekly-menus/view'

// In your router configuration:
{
  path: webRoutes.dashboard_weekly_menus,
  element: <WeeklyMenusIndex />
},
{
  path: webRoutes.dashboard_weekly_menus_add,
  element: <AddWeeklyMenu />
},
{
  path: webRoutes.dashboard_weekly_menus_edit,
  element: <EditWeeklyMenu />
},
{
  path: webRoutes.dashboard_weekly_menus_view,
  element: <ViewWeeklyMenu />
}
```

### 2. Add Navigation Link
Add a link to your dashboard navigation (e.g., in your sidebar):

```tsx
<Link to={webRoutes.dashboard_weekly_menus}>
  <Calendar className="w-4 h-4 mr-2" />
  Menus Hebdomadaires
</Link>
```

### 3. Backend API Requirements
Your Laravel backend should have these endpoints:

```php
// routes/api.php
Route::apiResource('weekly-menus', WeeklyMenuController::class);

// Expected endpoints:
GET    /api/weekly-menus          // List all
POST   /api/weekly-menus          // Create
GET    /api/weekly-menus/{id}     // Get one
PUT    /api/weekly-menus/{id}     // Update
DELETE /api/weekly-menus/{id}     // Delete
```

### 4. Test the Implementation
Navigate to:
- List: `/dashboard/weekly-menus`
- Add: `/dashboard/weekly-menus/add`
- Edit: `/dashboard/weekly-menus/edit/1`
- View: `/dashboard/weekly-menus/view/1`

## 🎨 Features Included

### Data Management
- ✅ List all weekly menus with pagination
- ✅ Create new menus with meal selection
- ✅ Edit existing menus
- ✅ View detailed menu information
- ✅ Delete menus with confirmation

### Meal Management
- ✅ Add meals to menu via modal
- ✅ Remove meals from menu
- ✅ Set special pricing per meal
- ✅ Mark meals as featured
- ✅ Set availability counts
- ✅ Track sold counts
- ✅ Position ordering

### UI Features
- ✅ Search and filtering
- ✅ Status badges (published, draft, active)
- ✅ Availability indicators (current, upcoming, finished)
- ✅ Progress bars for sales tracking
- ✅ Empty states
- ✅ Loading skeletons
- ✅ Success/error notifications
- ✅ Responsive design

### Data Display
- ✅ Week range display (e.g., "7 Oct - 13 Oct 2025")
- ✅ Meal count with featured indicator
- ✅ Publication status and date
- ✅ Sales statistics
- ✅ Stock status (in stock, low stock, out of stock)
- ✅ Price comparison (original vs special)

## 📝 Sample Data Structure

### Creating a Weekly Menu
```json
{
  "title": "Menu de la semaine du 20 au 26 octobre",
  "description": "Menu équilibré avec des plats variés",
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
    },
    {
      "meal_id": 2,
      "position": 2,
      "is_featured": false,
      "special_price": null,
      "availability_count": 30
    }
  ]
}
```

### Expected Response
```json
{
  "data": {
    "id": 1,
    "title": "Menu de la semaine du 20 au 26 octobre",
    "description": "Menu équilibré avec des plats variés",
    "week_start_date": "2025-10-20",
    "week_end_date": "2025-10-26",
    "is_active": true,
    "is_published": false,
    "published_at": null,
    "created_at": "2025-10-17T10:00:00.000Z",
    "updated_at": "2025-10-17T10:00:00.000Z",
    "meals": [
      {
        "id": 1,
        "weekly_menu_id": 1,
        "meal_id": 1,
        "position": 1,
        "is_featured": true,
        "special_price": 12.99,
        "availability_count": 50,
        "sold_count": 0,
        "meal": {
          "id": 1,
          "name": "Poulet grillé",
          "description": "Poulet mariné aux herbes",
          "price": 15.00,
          "image_path": "/images/meals/poulet.jpg"
        }
      }
    ]
  }
}
```

## 🐛 Troubleshooting

### Import errors after creating files
- Restart your TypeScript server in VS Code
- Run: `Ctrl/Cmd + Shift + P` → "TypeScript: Restart TS Server"

### Routes not working
- Make sure you've added the routes to your router configuration
- Check that the webRoutes imports are correct

### API errors
- Verify your Laravel backend has the correct endpoints
- Check CORS settings
- Verify API_URL in your config

## 🎯 Design Patterns Used
This implementation follows the exact same patterns as your **meals** system:
- ✅ Component structure
- ✅ Data table implementation
- ✅ Form handling
- ✅ State management
- ✅ Error handling
- ✅ Loading states
- ✅ Styling and UI components

Everything is consistent with your existing codebase! 🚀

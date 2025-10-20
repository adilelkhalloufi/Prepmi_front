# Meal Preparation Dashboard for Kitchen Staff

This module provides a comprehensive dashboard for kitchen staff to manage and track meal preparations with both table and calendar views.

## Features

### 🎯 Core Functionality
- **Real-time Status Management**: Update meal preparation status with a simple dropdown
- **Multiple Views**: Switch between table view and calendar view
- **Tablet-Optimized**: Responsive design perfect for tablets in the kitchen
- **Status Tracking**: Track meals through their preparation lifecycle

### 📊 Status Workflow
1. **En attente (Pending)** - Yellow badge - Meal is queued for preparation
2. **En cours (In Progress)** - Blue badge - Currently being prepared
3. **Prêt (Ready)** - Green badge - Meal is ready for delivery
4. **Livré (Delivered)** - Gray badge - Meal has been delivered

### 🗓️ Calendar View
- Visual calendar with highlighted dates that have meals
- Click any date to see all meals scheduled for that day
- Status summary cards showing count by status
- Quick status updates for each meal
- Display of meal images, quantities, and customer notes

### 📋 Table View
- Sortable columns (ID, Meal Name, Quantity, Date)
- Filter by meal name
- Filter by preparation status
- Column visibility controls
- Pagination for large datasets
- Displays meal images inline
- Shows customer information and delivery dates

## File Structure

```
src/pages/dashboard/meal-preparation/
├── index.tsx           # Main component with view switcher
├── columns.tsx         # Table column definitions
├── data-table.tsx      # Table view component
├── calendar-view.tsx   # Calendar view component
└── README.md          # This file
```

## API Integration

### Endpoint
```typescript
GET /api/meal-preparations
```

### Expected Response Format
```typescript
{
  data: MealPreparation[]
}
```

### Status Update Endpoint
```typescript
PUT /api/meal-preparations/:id/status
Body: { preparation_status: 'pending' | 'in-progress' | 'ready' | 'delivered' }
```

## Data Model

```typescript
interface MealPreparation {
  id: number
  order_id: number
  order?: Order
  meal_id: number
  meal?: Meal
  quantity: number
  preparation_status: 'pending' | 'in-progress' | 'ready' | 'delivered'
  preparation_date: string  // ISO 8601 format
  delivery_date?: string    // ISO 8601 format
  notes?: string
  customer_name?: string
  created_at?: string
  updated_at?: string
}
```

## Usage

### Accessing the Dashboard

Navigate to: `/dashboard/meal-preparation`

### For Kitchen Staff

1. **View Today's Meals**: Open the calendar view and select today's date
2. **Update Status**: Click on the status dropdown and select the new status
3. **Check Quantities**: Large quantity badges make it easy to see how many to prepare
4. **Read Notes**: Customer notes and special instructions are displayed prominently
5. **Filter by Status**: Use the status filter to focus on specific preparation stages

### For Administrators

- Monitor overall preparation progress
- Track delivery schedules
- Identify bottlenecks in the preparation process

## Responsive Design

### Desktop (1920x1080+)
- Full table view with all columns visible
- Side-by-side calendar and meal list

### Tablet (768x1024)
- Optimized touch targets
- Compact table layout
- Stack calendar and meal list vertically

### Mobile (< 768px)
- Hidden columns can be toggled
- Vertical card layout in calendar view
- Single-column table with horizontal scroll

## Customization

### Adding New Status Types

Edit `columns.tsx` and `calendar-view.tsx`:

```typescript
const statusConfig = {
  // Add new status
  'your-status': {
    label: "Your Label",
    variant: "bg-color-500 hover:bg-color-600",
  },
  // existing statuses...
};
```

Also update the interface in `src/interfaces/admin.tsx`:

```typescript
preparation_status: 'pending' | 'in-progress' | 'ready' | 'delivered' | 'your-status'
```

### Changing Colors

Modify the `statusConfig` object with Tailwind CSS classes:
- `bg-yellow-500` - Yellow
- `bg-blue-500` - Blue
- `bg-green-500` - Green
- `bg-red-500` - Red
- `bg-purple-500` - Purple

## Dependencies

- `@tanstack/react-table` - Table management
- `date-fns` - Date formatting and manipulation
- `lucide-react` - Icons
- `@radix-ui` components - UI primitives
- Tailwind CSS - Styling

## Backend Integration Notes

To fully integrate this feature, your backend should:

1. **Create the meal-preparations endpoint** that returns data in the expected format
2. **Implement status update endpoint** to persist status changes
3. **Support filtering** by date range for efficient calendar loading
4. **Include meal relations** (meal details, customer info) in the response
5. **Handle optimistic updates** by returning the updated resource

### Example Backend Query (Laravel/PHP)
```php
MealPreparation::with(['meal', 'order.user'])
    ->whereDate('preparation_date', $date)
    ->get();
```

## Troubleshooting

### Issue: No meals showing
- Check API endpoint configuration in `src/routes/api.tsx`
- Verify backend is returning data in correct format
- Check browser console for API errors

### Issue: Status updates not saving
- Verify PUT endpoint is implemented
- Check CORS configuration
- Ensure authentication token is valid

### Issue: Calendar dates not highlighting
- Ensure `preparation_date` is in ISO 8601 format
- Check that dates are being parsed correctly by `date-fns`

## Future Enhancements

- [ ] Print view for kitchen tickets
- [ ] Bulk status updates
- [ ] Timer/countdown for cooking time
- [ ] Ingredient checklist per meal
- [ ] Push notifications when status changes
- [ ] Weekly prep planning view
- [ ] Export to PDF/Excel
- [ ] Multi-language support (already has fr-FR)
- [ ] Dark mode optimization
- [ ] Offline support with sync

## Support

For issues or questions, contact the development team or open an issue in the project repository.

# 🚀 Quick Start Guide - Meal Preparation Dashboard

## For Developers

### 1. Test with Mock Data (Recommended First)

Edit `src/pages/dashboard/meal-preparation/index.tsx`:

```typescript
// Add import at the top
import { mockMealPreparations } from "./mock-data"

// In the useEffect, replace the API call:
useEffect(() => {
    // TESTING: Use mock data
    setData(mockMealPreparations);
    setLoading(false);
    
    // PRODUCTION: Use real API (comment out for now)
    // fetchMealPreparations();
}, []);
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Access the Page

- Navigate to: `http://localhost:5173/login`
- Login as Admin or Chef/Cuisinier
- Click "Préparation Repas" in the sidebar
- Or directly: `http://localhost:5173/dashboard/meal-preparation`

### 4. Test Features

✅ **Table View**:
- Try sorting columns
- Use the search box
- Filter by status
- Toggle column visibility
- Update a status

✅ **Calendar View**:
- Click on today's date (highlighted)
- View the status summary
- Change a meal status
- Check responsive layout

## For Backend Developers

### Required API Endpoints

#### 1. Get Meal Preparations
```
GET /api/meal-preparations

Response:
{
  "data": [
    {
      "id": 1,
      "order_id": 101,
      "meal_id": 1,
      "quantity": 3,
      "preparation_status": "pending",
      "preparation_date": "2025-10-20",
      "delivery_date": "2025-10-21",
      "notes": "Special instructions",
      "customer_name": "Customer Name",
      "meal": {
        "id": 1,
        "name": "Meal Name",
        "image_path": "https://...",
        "short_description": "Description"
      },
      "order": {
        "id": 101,
        "user": {
          "name": "Customer Name"
        }
      }
    }
  ]
}
```

#### 2. Update Status
```
PUT /api/meal-preparations/:id/status

Body:
{
  "preparation_status": "in-progress"
}

Response:
{
  "success": true,
  "data": { /* updated meal preparation */ }
}
```

### Laravel Example (Optional)

```php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/meal-preparations', [MealPreparationController::class, 'index']);
    Route::put('/meal-preparations/{id}/status', [MealPreparationController::class, 'updateStatus']);
});

// MealPreparationController.php
public function index(Request $request)
{
    $preparations = MealPreparation::with(['meal', 'order.user'])
        ->whereDate('preparation_date', '>=', now())
        ->orderBy('preparation_date', 'asc')
        ->get();
    
    return response()->json(['data' => $preparations]);
}

public function updateStatus(Request $request, $id)
{
    $validated = $request->validate([
        'preparation_status' => 'required|in:pending,in-progress,ready,delivered'
    ]);
    
    $preparation = MealPreparation::findOrFail($id);
    $preparation->update($validated);
    
    return response()->json(['success' => true, 'data' => $preparation]);
}
```

## For Kitchen Staff (Users)

### Daily Workflow

**Morning - 8:00 AM**
1. Open tablet/computer
2. Go to dashboard
3. Click "Préparation Repas"
4. Switch to Calendar View
5. Select today's date
6. Review all meals for the day

**During Preparation**
1. Find the meal in the list
2. Read any special notes (red box)
3. Check quantity (big number badge)
4. Change status to "En cours" (blue)
5. Start cooking

**When Meal is Ready**
1. Find the meal again
2. Change status to "Prêt" (green)
3. Notify delivery team

**After Delivery**
1. Change status to "Livré" (gray)
2. Move to next meal

### Tips

💡 **Use Status Colors**:
- 🟡 Yellow = Need to start
- 🔵 Blue = I'm working on it
- 🟢 Green = Ready to go
- ⚫ Gray = Done

💡 **Read the Notes**: Red highlighted boxes have special instructions

💡 **Check Quantities**: Big numbers tell you how many to make

💡 **Filter by Status**: Focus on "En attente" first thing in the morning

## Testing Checklist

### Frontend Tests

- [ ] Page loads without errors
- [ ] Both views (Table & Calendar) work
- [ ] Status dropdown changes color
- [ ] Search filters results
- [ ] Status filter works
- [ ] Calendar date selection works
- [ ] Responsive on tablet size
- [ ] Images load correctly
- [ ] Notes are displayed
- [ ] Pagination works

### Integration Tests

- [ ] API endpoint returns data
- [ ] Status updates save to database
- [ ] Real-time updates work (if implemented)
- [ ] Error handling shows messages
- [ ] Authentication required
- [ ] Role-based access works

### Browser Tests

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (iOS)
- [ ] Mobile browsers

## Common Issues & Solutions

### Issue: TypeScript errors on imports
**Solution**: Restart the TypeScript server in VS Code
- Press `Ctrl+Shift+P`
- Type "TypeScript: Restart TS Server"
- Press Enter

### Issue: Page shows "Cannot find module"
**Solution**: Check that all files were created:
```bash
ls src/pages/dashboard/meal-preparation/
# Should show: calendar-view.tsx, columns.tsx, data-table.tsx, index.tsx
```

### Issue: No data showing
**Solution**: Use mock data first (see step 1 above)

### Issue: Calendar not highlighting dates
**Solution**: Ensure dates are in ISO format (YYYY-MM-DD)

### Issue: Status dropdown not updating
**Solution**: Check browser console for API errors

## Next Steps After Setup

1. **Test with mock data** ✅
2. **Implement backend API** 
3. **Connect to real API**
4. **Test with real users (kitchen staff)**
5. **Gather feedback**
6. **Iterate and improve**

## File Locations Reference

```
src/
├── pages/dashboard/meal-preparation/
│   ├── index.tsx              ← Main component
│   ├── columns.tsx            ← Table columns
│   ├── data-table.tsx         ← Table view
│   ├── calendar-view.tsx      ← Calendar view
│   ├── mock-data.ts           ← Test data
│   ├── README.md              ← Documentation
│   └── VISUAL_GUIDE.md        ← UI guide
├── interfaces/admin.tsx        ← MealPreparation interface
├── routes/
│   ├── api.tsx                ← API endpoints
│   ├── web.tsx                ← Web routes
│   └── browserRouter.tsx      ← Route config
└── components/dashboard/data/
    └── sidelinks.tsx          ← Navigation menu
```

## Support

Need help? Check:
1. README.md - Full documentation
2. VISUAL_GUIDE.md - UI reference
3. mock-data.ts - Data structure example
4. MEAL_PREPARATION_IMPLEMENTATION.md - Complete overview

---

**Ready to use**: Yes, with mock data
**Production ready**: After backend implementation
**Last updated**: October 20, 2025

# 🚀 Quick Reference - Meal Preparation Dashboard

## Status Values (Backend & Frontend Match)

```
pending             → 🟡 En attente
preparing           → 🔵 En préparation  
ready_for_delivery  → 🟢 Prêt pour livraison
delivered           → ⚫ Livré
cancelled           → 🔴 Annulé
```

## API Calls

### Get All Preparations
```typescript
GET /api/meal-preparations
Response: { data: MealPreparation[] }
```

### Update Status
```typescript
PATCH /api/meal-preparations/{id}/status
Body: { preparation_status: "preparing" }
Response: { success: true, data: {...}, message: "..." }
```

## Files Updated

- ✅ `interfaces/admin.tsx` - MealPreparation interface
- ✅ `pages/dashboard/meal-preparation/index.tsx` - API integration
- ✅ `pages/dashboard/meal-preparation/columns.tsx` - Status config
- ✅ `pages/dashboard/meal-preparation/calendar-view.tsx` - Status config
- ✅ `pages/dashboard/meal-preparation/data-table.tsx` - Filters
- ✅ `pages/dashboard/meal-preparation/mock-data.ts` - Test data

## Usage

### Access
```
URL: http://localhost:5173/dashboard/meal-preparation
Roles: Admin (1), Cuisinier (2)
```

### Test with Mock Data
```typescript
// Already configured in index.tsx
.catch(() => {
    setData(mockMealPreparations); // Auto fallback
    setLoading(false);
});
```

### Test with Real API
1. Start Laravel backend
2. Verify API_URL in `src/routes/api.tsx`
3. Open dashboard
4. Check Network tab for API calls

## Expected Response Format

```json
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
        "name": "Tajine de Poulet",
        "short_description": "...",
        "image_path": "https://..."
      },
      "order": {
        "id": 101,
        "user": { "name": "Customer" }
      }
    }
  ]
}
```

## Laravel Controller Methods

```php
index()           // All preparations
today()           // Today's only
upcoming()        // Future dates
byStatus($status) // Filter by status
show($id)         // Single prep
updateStatus($id) // PATCH status
updateNotes($id)  // PATCH notes
statistics()      // Counts by status
```

## Common Issues

### TypeScript errors?
→ Restart TS Server (Ctrl+Shift+P → "TypeScript: Restart TS Server")

### No data showing?
→ Check: (1) API running (2) CORS config (3) Auth token

### Status not updating?
→ Check: (1) Network tab (2) Console errors (3) Backend validation

---

**Ready**: ✅  
**Backend Compatible**: ✅  
**Last Updated**: Oct 20, 2025

# 🔌 Backend API Integration Guide

This document shows how the frontend integrates with your Laravel backend API.

## API Endpoints Configuration

### Available Endpoints

```typescript
// From your Laravel routes
GET    /api/meal-preparations                 // Get all meal preparations
GET    /api/meal-preparations/today           // Get today's preparations
GET    /api/meal-preparations/upcoming        // Get upcoming preparations
GET    /api/meal-preparations/statistics      // Get statistics
GET    /api/meal-preparations/status/{status} // Get by status
GET    /api/meal-preparations/{id}            // Get single preparation
PATCH  /api/meal-preparations/{id}/status     // Update status
PATCH  /api/meal-preparations/{id}/notes      // Update notes
```

## Status Values Mapping

The frontend uses the exact same status values as your backend:

```typescript
'pending'           => 'En attente'          (Yellow)
'preparing'         => 'En préparation'      (Blue)
'ready_for_delivery' => 'Prêt pour livraison' (Green)
'delivered'         => 'Livré'               (Gray)
'cancelled'         => 'Annulé'              (Red)
```

## Current Implementation

### 1. Fetching Meal Preparations

**Location**: `src/pages/dashboard/meal-preparation/index.tsx`

```typescript
const fetchMealPreparations = () => {
    http.get(apiRoutes.mealPreparations).then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
    }).catch(() => {
        // Fallback to mock data if API fails
        setData(mockMealPreparations);
        setLoading(false);
    });
};
```

**API Route**: `GET /api/meal-preparations`

**Expected Response**:
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
      "notes": "Client allergique aux noix",
      "customer_name": "Mohammed Alami",
      "meal": {
        "id": 1,
        "name": "Tajine de Poulet aux Olives",
        "short_description": "Tajine marocain traditionnel",
        "image_path": "https://example.com/image.jpg",
        "price": 85
      },
      "order": {
        "id": 101,
        "user": {
          "name": "Mohammed Alami",
          "email": "mohammed@example.com"
        }
      },
      "created_at": "2025-10-19T10:00:00.000000Z",
      "updated_at": "2025-10-19T10:00:00.000000Z"
    }
  ]
}
```

### 2. Updating Status

**Location**: `src/pages/dashboard/meal-preparation/index.tsx`

```typescript
const handleStatusUpdate = (id: number, newStatus: string) => {
    // Optimistic update (UI updates immediately)
    setData(prevData => 
        prevData.map(item => 
            item.id === id ? { ...item, preparation_status: newStatus } : item
        )
    );
    
    // API call
    http.patch(`${apiRoutes.mealPreparations}/${id}/status`, { 
        preparation_status: newStatus 
    }).then(() => {
        fetchMealPreparations(); // Refresh data
    }).catch((error) => {
        console.error("Error updating status:", error);
        fetchMealPreparations(); // Revert on error
    });
};
```

**API Route**: `PATCH /api/meal-preparations/{id}/status`

**Request Body**:
```json
{
  "preparation_status": "preparing"
}
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "preparation_status": "preparing",
    // ... rest of the meal preparation data
  },
  "message": "Status updated successfully"
}
```

## Optional Endpoint Usage

You can enhance the dashboard by using these additional endpoints:

### Get Today's Meals

```typescript
// Add this function to index.tsx
const fetchTodayMeals = () => {
    http.get(`${apiRoutes.mealPreparations}/today`).then((res) => {
        setData(res.data.data);
        setLoading(false);
    });
};
```

### Get Upcoming Meals

```typescript
const fetchUpcomingMeals = () => {
    http.get(`${apiRoutes.mealPreparations}/upcoming`).then((res) => {
        setData(res.data.data);
        setLoading(false);
    });
};
```

### Get Meals by Status

```typescript
const fetchMealsByStatus = (status: string) => {
    http.get(`${apiRoutes.mealPreparations}/status/${status}`).then((res) => {
        setData(res.data.data);
        setLoading(false);
    });
};
```

### Get Statistics

```typescript
const [statistics, setStatistics] = useState(null);

const fetchStatistics = () => {
    http.get(`${apiRoutes.mealPreparations}/statistics`).then((res) => {
        setStatistics(res.data.data);
    });
};

// Expected response:
{
  "data": {
    "total": 25,
    "pending": 5,
    "preparing": 8,
    "ready_for_delivery": 7,
    "delivered": 3,
    "cancelled": 2,
    "today_count": 12,
    "upcoming_count": 13
  }
}
```

## Laravel Backend Example

Here's what your Laravel controller should return:

### MealPreparationController.php

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MealPreparation;
use Illuminate\Http\Request;

class MealPreparationController extends Controller
{
    public function index()
    {
        $preparations = MealPreparation::with(['meal', 'order.user'])
            ->orderBy('preparation_date', 'asc')
            ->get();
        
        return response()->json(['data' => $preparations]);
    }
    
    public function today()
    {
        $preparations = MealPreparation::with(['meal', 'order.user'])
            ->whereDate('preparation_date', today())
            ->orderBy('preparation_date', 'asc')
            ->get();
        
        return response()->json(['data' => $preparations]);
    }
    
    public function upcoming()
    {
        $preparations = MealPreparation::with(['meal', 'order.user'])
            ->whereDate('preparation_date', '>', today())
            ->orderBy('preparation_date', 'asc')
            ->get();
        
        return response()->json(['data' => $preparations]);
    }
    
    public function byStatus($status)
    {
        $preparations = MealPreparation::with(['meal', 'order.user'])
            ->where('preparation_status', $status)
            ->orderBy('preparation_date', 'asc')
            ->get();
        
        return response()->json(['data' => $preparations]);
    }
    
    public function show($id)
    {
        $preparation = MealPreparation::with(['meal', 'order.user'])
            ->findOrFail($id);
        
        return response()->json(['data' => $preparation]);
    }
    
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'preparation_status' => 'required|in:pending,preparing,ready_for_delivery,delivered,cancelled'
        ]);
        
        $preparation = MealPreparation::findOrFail($id);
        $preparation->update($validated);
        
        return response()->json([
            'success' => true,
            'data' => $preparation->load(['meal', 'order.user']),
            'message' => 'Status updated successfully'
        ]);
    }
    
    public function updateNotes(Request $request, $id)
    {
        $validated = $request->validate([
            'notes' => 'nullable|string|max:1000'
        ]);
        
        $preparation = MealPreparation::findOrFail($id);
        $preparation->update($validated);
        
        return response()->json([
            'success' => true,
            'data' => $preparation,
            'message' => 'Notes updated successfully'
        ]);
    }
    
    public function statistics()
    {
        $stats = [
            'total' => MealPreparation::count(),
            'pending' => MealPreparation::where('preparation_status', 'pending')->count(),
            'preparing' => MealPreparation::where('preparation_status', 'preparing')->count(),
            'ready_for_delivery' => MealPreparation::where('preparation_status', 'ready_for_delivery')->count(),
            'delivered' => MealPreparation::where('preparation_status', 'delivered')->count(),
            'cancelled' => MealPreparation::where('preparation_status', 'cancelled')->count(),
            'today_count' => MealPreparation::whereDate('preparation_date', today())->count(),
            'upcoming_count' => MealPreparation::whereDate('preparation_date', '>', today())->count(),
        ];
        
        return response()->json(['data' => $stats]);
    }
}
```

## Testing the Integration

### 1. Test with Mock Data First

The dashboard will automatically fall back to mock data if the API fails. Test this by:

```bash
npm run dev
```

Navigate to `/dashboard/meal-preparation` - you should see mock data.

### 2. Test with Real API

Once your backend is ready:

1. Ensure `apiRoutes.mealPreparations` points to your API
2. Remove the mock data fallback in `index.tsx`
3. Test each feature:
   - ✅ Load meal preparations
   - ✅ Change status
   - ✅ Filter by status
   - ✅ Search meals
   - ✅ Calendar view

### 3. Test Status Updates

1. Find a meal with status "pending"
2. Click the status dropdown
3. Select "preparing"
4. Check browser console for PATCH request
5. Verify database was updated

## Error Handling

The current implementation handles errors gracefully:

```typescript
.catch((error) => {
    console.error("Error updating status:", error);
    fetchMealPreparations(); // Reverts optimistic update
});
```

You can enhance this with toast notifications:

```typescript
import { toast } from "sonner"

.catch((error) => {
    console.error("Error updating status:", error);
    toast.error("Erreur lors de la mise à jour du statut");
    fetchMealPreparations();
});
```

## CORS Configuration

Make sure your Laravel backend allows requests from your frontend:

```php
// config/cors.php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:5173'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

## Authentication

The `http` utility automatically handles authentication tokens. Ensure your backend validates them:

```php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('meal-preparations', [MealPreparationController::class, 'index']);
    // ... other routes
});
```

## Next Steps

1. ✅ Status values updated to match backend
2. ✅ PATCH method used for status updates
3. ✅ Correct endpoint structure
4. ⏳ Test with real backend API
5. ⏳ Add toast notifications for user feedback
6. ⏳ Implement real-time updates (optional)
7. ⏳ Add statistics dashboard (optional)

---

**Status**: Ready for backend integration
**Last Updated**: October 20, 2025

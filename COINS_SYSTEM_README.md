# Coins System Implementation

## Overview
This implementation adds a comprehensive coins system to your checkout page where users can pay for products using coins instead of or in addition to regular currency.

## Features Added

### 1. User Coins Management
- **User Interface Updates**: Added `coins` field to the `User` interface
- **Redux Store**: Created `userSlice` to manage user's coin balance
- **Default Coins**: Users start with 5000 coins by default

### 2. Product Coins Cost
- **Product Interface Updates**: Added `coins_cost` field to the `Product` interface
- **Auto-calculation**: If a product doesn't have a `coins_cost`, it's automatically set to 10% of the price (minimum 10 coins)

### 3. Checkout Page Enhancements
- **Coins Display Card**: Shows current balance, required coins, and remaining coins after purchase
- **Product Cards**: Each product now displays its coin cost with a coin icon
- **Insufficient Funds**: Warning when user doesn't have enough coins
- **Button Disable**: Checkout button is disabled when insufficient coins
- **Order Processing**: Coins are automatically deducted when order is placed

### 4. Translation Support
Added translations for:
- `checkout.coins` - "Your Coins" / "Vos Pièces" / "عملاتك"
- `checkout.coins.current` - "Current Balance" / "Solde Actuel" / "الرصيد الحالي"
- `checkout.coins.cost` - "Cost in Coins" / "Coût en Pièces" / "التكلفة بالعملات"
- `checkout.coins.remaining` - "Remaining After Purchase" / "Restant Après Achat" / "المتبقي بعد الشراء"
- `checkout.coins.insufficient` - "Insufficient coins for this purchase" / "Pièces insuffisantes pour cet achat" / "عملات غير كافية لهذا الشراء"
- `checkout.coins.unit` - "coins" / "pièces" / "عملات"

### 5. Utility Components
- **CoinsDisplay**: Reusable component to show user's coin balance
- **CoinsManager**: Admin component to add/remove/set user coins for testing

## Usage

### In Checkout Page
The checkout page now automatically:
1. Calculates total coins required for all products in cart
2. Shows user's current coin balance
3. Displays remaining coins after purchase
4. Prevents checkout if insufficient coins
5. Deducts coins from user's balance when order is successful

### Redux Actions Available
```typescript
// Add coins to user's balance
dispatch(addCoins(amount));

// Spend/deduct coins from user's balance
dispatch(spendCoins(amount));

// Set exact coin amount
dispatch(updateCoins(amount));

// Set entire user object
dispatch(setUser(userObject));
```

### Adding Coins to Products
When adding products to cart, they automatically get a `coins_cost` if not provided:
```typescript
// Manual assignment
product.coins_cost = 50;

// Automatic assignment (10% of price, minimum 10)
// This happens automatically in the cart slice
```

## Files Modified/Created

### Modified Files
1. `src/interfaces/admin.tsx` - Added coins to User and Product interfaces
2. `src/pages/checkout.tsx` - Added coins display and logic
3. `src/store/index.tsx` - Added user slice to store
4. `src/store/slices/cartSlice.tsx` - Auto-assign coins_cost to products
5. `src/locales/en/translation.json` - Added English translations
6. `src/locales/fr/translation.json` - Added French translations
7. `src/locales/ar/translation.json` - Added Arabic translations

### Created Files
1. `src/store/slices/userSlice.tsx` - User state management
2. `src/components/ui/coins-display.tsx` - Reusable coins display component
3. `src/components/dashboard/custom/coins-manager.tsx` - Admin coins management

## Testing
To test the coins system:
1. Add products to cart
2. Go to checkout page
3. Observe the coins card showing current balance and required coins
4. Try to checkout with insufficient coins (system will prevent it)
5. Use the CoinsManager component to adjust coin balance for testing

## Future Enhancements
- Connect coins to backend API
- Add coins earning system (rewards, points, etc.)
- Add coin purchase functionality
- Add coin transaction history
- Add different coin costs for different product categories

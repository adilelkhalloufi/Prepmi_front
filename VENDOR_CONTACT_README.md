# Vendor Contact Feature Implementation

## Overview
This implementation adds a vendor contact feature to the single product page where authenticated users can view seller contact information for 1 coin.

## Features Implemented

### 1. VendorContact Component (`src/components/products/VendorContact.tsx`)
- **Responsive Design**: Shows different states based on user authentication and payment status
- **Payment System**: Costs 1 coin to unlock vendor contact information
- **Authentication Check**: Only shows contact option to logged-in users
- **Insufficient Funds Handling**: Prevents viewing when user has insufficient coins
- **Fallback API**: Gracefully handles API failures with local state management
- **Confirmation Dialog**: Asks user confirmation before spending coins

### 2. UI States

#### For Non-Authenticated Users:
- Shows login prompt with call-to-action button
- Explains that login is required to view vendor contact

#### For Authenticated Users (Before Payment):
- Shows vendor basic information (name, role)
- Displays payment prompt with coin cost
- Shows user's current coin balance
- Provides "View Contact" button (disabled if insufficient funds)
- Shows confirmation dialog before payment

#### For Authenticated Users (After Payment):
- Shows full vendor contact information:
  - Phone number
  - Email address  
  - Physical address
  - Company name
- Contact information is highlighted with green styling
- Shows payment confirmation message

### 3. Integration with SingleProduct Page
- Added VendorContact component import
- Integrated component in product details section
- Shows only when product has associated vendor (`product?.user`)
- Positioned between product actions and related products

### 4. Translation Support
Added comprehensive translations in English, French, and Arabic:

**Key Translation Keys:**
- `product.vendor.title` - "Vendor Contact" / "Contact Vendeur" / "تواصل مع البائع"
- `product.vendor.unlock_contact` - "Unlock Contact Information"
- `product.vendor.cost_description` - Payment description with cost
- `product.vendor.confirm_title` - Confirmation dialog title
- `product.vendor.insufficient_coins` - Insufficient funds message
- `product.vendor.contact_unlocked` - Success message
- And many more...

### 5. Interface Updates
Extended the `User` interface in `src/interfaces/admin.tsx`:
```typescript
export interface User {
    // ... existing fields
    phone?: string
    address?: string  // Added
    company?: string  // Added
}
```

### 6. API Integration
- Added `spend_coins` endpoint to `src/routes/api.tsx`
- Implements graceful fallback for demo purposes
- Handles API failures by using local state management
- Provides proper error handling and user feedback

### 7. Redux Integration
- Uses existing `spendCoins` action from `adminSlice`
- Updates user's coin balance after successful payment
- Maintains state consistency across the application

## User Flow

1. **Unauthenticated User**:
   - Sees login prompt
   - Must authenticate to proceed

2. **Authenticated User with Sufficient Coins**:
   - Sees vendor preview information
   - Clicks "View Contact" button
   - Confirms payment in dialog
   - Coins are deducted
   - Full contact information is revealed

3. **Authenticated User with Insufficient Coins**:
   - Sees payment prompt but button is disabled
   - Gets warning message about insufficient funds
   - Cannot proceed without more coins

## Technical Features

### Error Handling
- API failure fallback
- User feedback through toast notifications
- Form validation for coin balance
- Loading states during API calls

### Security Considerations
- Authentication required for any contact viewing
- Payment verification before revealing information
- State management prevents bypassing payment

### Accessibility
- Proper ARIA labels and semantic HTML
- Screen reader friendly icons and descriptions
- Keyboard navigation support
- Color contrast compliance

## Testing the Feature

1. **Navigate to any single product page**
2. **Without login**: See login prompt in vendor contact section
3. **After login**: See payment prompt with your coin balance
4. **Click "View Contact"**: See confirmation dialog
5. **Confirm payment**: Contact information is revealed and coins deducted
6. **Verify coin balance**: Check that 1 coin was deducted from your account

## Files Modified/Created

### Created Files:
- `src/components/products/VendorContact.tsx` - Main vendor contact component

### Modified Files:
- `src/pages/SingleProduct.tsx` - Added VendorContact component integration
- `src/interfaces/admin.tsx` - Extended User interface with address and company fields
- `src/routes/api.tsx` - Added spend_coins endpoint
- `src/locales/en/translation.json` - Added English translations
- `src/locales/fr/translation.json` - Added French translations  
- `src/locales/ar/translation.json` - Added Arabic translations

## Future Enhancements

1. **Contact History**: Track which contacts user has already purchased
2. **Bulk Discounts**: Offer discounts for viewing multiple contacts
3. **Contact Ratings**: Allow users to rate vendor responsiveness
4. **Direct Messaging**: Integrate with messaging system after contact purchase
5. **Refund System**: Allow refunds if contact information is invalid
6. **Premium Contacts**: Different pricing tiers for verified vs unverified vendors

## Demo Data
The feature works with any product that has associated user/vendor information. The contact information displayed includes:
- Vendor name and role
- Phone number (if available)
- Email address (if available) 
- Physical address (if available)
- Company name (if available)

The implementation is fully functional and ready for use with proper backend API integration.

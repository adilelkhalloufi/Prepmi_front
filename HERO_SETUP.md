# Hero Section Setup Guide

## Overview

The new hero section has been created based on the meal prep design with:

- Wooden background with overlay
- "YOU WORK, WE FUEL" headline
- "BUILD MY BOX" CTA button
- Three featured meal cards

## Required Images

To complete the hero section, you need to add the following images to your `public` folder:

### 1. Background Image

- **Path**: `public/wooden-background.jpg`
- **Description**: Wooden texture background (like in the design)
- **Recommended size**: 1920x1080px or larger

### 2. Meal Images

Add these images to `public/meals/`:

- `public/meals/bbq-chicken.jpg` - BBQ chicken with vegetables in a black container
- `public/meals/salmon-greens.jpg` - Salmon with greens in a white container
- `public/meals/pork-stir-fry.jpg` - Pork stir-fry with vegetables in a black container

**Recommended size for meal images**: 400x400px (square aspect ratio)

## Quick Setup

1. Create the `meals` folder in `public`:

   ```
   public/
   ├── wooden-background.jpg
   └── meals/
       ├── bbq-chicken.jpg
       ├── salmon-greens.jpg
       └── pork-stir-fry.jpg
   ```

2. The component will use placeholder images if the actual images are not found, so you can test the layout immediately.

## Customization

### Update Meal Data

Edit the `featuredMeals` array in `Hero.tsx` to change:

- Meal names
- Calories
- Protein amounts
- Image paths

### Color Scheme

Current colors match the design:

- Button: `bg-red-700` (can be changed to your brand color)
- Card backgrounds: `from-amber-900/40 to-stone-800/40` (warm, wooden tone)

### Background Alternative

If you don't have a wooden background image, you can:

1. Use a solid color: Replace the background div with `className="bg-stone-900"`
2. Use a gradient: Replace with `className="bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900"`

## Features Included

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Hover effects on meal cards
- ✅ Smooth animations
- ✅ Backdrop blur effects
- ✅ Fallback images if photos are missing
- ✅ Fully styled with Tailwind CSS

## Browser Compatibility

The hero section uses modern CSS features:

- Backdrop filter (blur)
- CSS Grid
- CSS Gradients
- CSS Animations

All are supported in modern browsers (Chrome, Firefox, Safari, Edge).

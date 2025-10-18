# 🍴 Prepmi – Meal Subscription & Delivery Platform

Prepmi is a Laravel-based meal delivery and subscription platform inspired by services like [SimmerEats](https://www.simmereats.com/).  
It allows users to subscribe to healthy weekly meal plans, browse rotating menus, place orders, and track deliveries with ease.

The goal of Prepmi is to make **meal prep simple, flexible, and convenient** by offering healthy pre-made meals with customizable plans and dietary options.

---

## 🌟 Core Functions

- **User Accounts** – Register, log in, manage profile & dietary preferences
- **Meal Catalog** – Explore meals with nutrition facts, dietary tags (vegetarian, gluten-free, etc.)
- **Weekly Menu** – Curated rotating menus updated each week
- **Subscriptions** – Flexible meal plans with recurring billing (pause/cancel anytime)
- **Ordering System** – Place one-time or recurring subscription orders
- **Delivery Management** – Track delivery status with courier & delivery window
- **Payments** – Secure online payments with Stripe/PayPal
- **Reviews & Feedback** – Users can rate meals and share experiences
- **Coupons & Gift Cards (optional)** – Apply discounts and promo codes

---

## 🗄 Tables and Fields

| **Table**                                      | **Fields / Columns**                                                                                                                                                                                              | **Description / Notes**                                                  |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **users**                                      | `id`, `name`, `email`, `password`, `phone`, `address`, `city`, `postal_code`, `country`, `created_at`, `updated_at`                                                                                               | Basic user info. Maybe also store preferences like dietary restrictions. |
| **user_preferences** _(optional)_              | `id`, `user_id`, `vegetarian (bool)`, `vegan`, `gluten_free`, `allergies (text)`, etc.                                                                                                                            | If users can filter or set their preferences.                            |
| **plans**                                      | `id`, `name`, `description`, `price_per_meal`, `meals_per_week`, `delivery_frequency`, `min_weeks_commitment`, `created_at`, `updated_at`                                                                         | Subscription plans that define what a customer subscribes to.            |
| **subscriptions**                              | `id`, `user_id`, `plan_id`, `status (active, paused, cancelled)`, `next_billing_date`, `started_at`, `ended_at`, etc.                                                                                             | Manages recurring orders.                                                |
| **meals**                                      | `id`, `name`, `description`, `image_path`, `calories`, `protein`, `carbs`, `fats`, `vegetarian (bool)`, `gluten_free (bool)`, `available_from (date)`, `available_to (date)`, `created_at`, `updated_at`          | Dishes / meal items.                                                     |
| **weekly_menus**                               | `id`, `week_start_date`, `created_at`, `updated_at`                                                                                                                                                               | Represents each week’s menu.                                             |
| **menu_meals**                                 | `id`, `weekly_menu_id`, `meal_id`                                                                                                                                                                                 | Many-to-many: which meals are in which week’s menu.                      |
| **orders**                                     | `id`, `user_id`, `subscription_id (nullable)`, `order_date`, `delivery_date`, `status (pending, preparing, shipped, delivered, cancelled)`, `total_price`, `address_id`, `payment_id`, `created_at`, `updated_at` | Each order placed (recurring or one-off).                                |
| **order_meals**                                | `id`, `order_id`, `meal_id`, `quantity`, `meal_price_at_order`, etc.                                                                                                                                              | Items in an order. Price locked at order time.                           |
| **deliveries**                                 | `id`, `order_id`, `courier_name`, `tracking_number`, `delivery_window_start`, `delivery_window_end`, `delivered_at`, `status`                                                                                     | To manage delivery tracking.                                             |
| **addresses**                                  | `id`, `user_id`, `address_line1`, `address_line2`, `city`, `postal_code`, `country`, `instructions`                                                                                                               | If users have multiple delivery addresses or special instructions.       |
| **payments**                                   | `id`, `user_id`, `order_id`, `amount`, `payment_method`, `status (pending, succeeded, failed)`, `transaction_id`, `paid_at`, `created_at`, `updated_at`                                                           | Tracking payments.                                                       |
| **gifts / gift_cards** _(optional)_            | `id`, `code`, `amount`, `balance`, `expiry_date`, `created_at`, `used_at`, `user_id (nullable)`                                                                                                                   | Gift card system for users.                                              |
| **reviews / testimonials** _(optional)_        | `id`, `user_id`, `meal_id (or order_id)`, `rating (1–5)`, `comment`, `created_at`, `updated_at`                                                                                                                   | Ratings and reviews from users.                                          |
| **faqs / blog_posts** _(optional)_             | `id`, `title`, `slug`, `content`, `author_id`, `published_at`, etc.                                                                                                                                               | Content management for FAQ and blog.                                     |
| **delivery_zones** _(optional)_                | `id`, `name`, `postal_codes`, `pricing_rules`                                                                                                                                                                     | Define areas where delivery is available.                                |
| **coupons / discounts** _(optional)_           | `id`, `code`, `discount_type (percentage, fixed)`, `value`, `min_order_amount`, `valid_from`, `valid_to`, `usage_limit`, `times_used`                                                                             | Discount codes system.                                                   |
| **packaging / packaging_details** _(optional)_ | `id`, `order_id`, `packaging_type`, `notes`                                                                                                                                                                       | Details about packaging used (eco-friendly, chilled, etc).               |

---

## 🔗 Relationships

- A **user** has many **orders**, **subscriptions**, **addresses**, and **reviews**.
- A **plan** has many **subscriptions**.
- A **subscription** belongs to a user and a plan, and generates many orders.
- A **weekly_menu** has many **meals** (via `menu_meals`).
- An **order** has many meals (via `order_meals`) and one delivery.
- A **payment** belongs to an order.

---

## ⚙️ Tech Stack

- **Backend**: Laravel 10+
- **Database**: MySQL / MariaDB
- **Frontend**: React js

---

## 📜 License

MIT License – free to use and modify.

---

## 🎨 Frontend Structure

### User Management Module

**Location**: `src/pages/Users/`

**Components**:

- `UserList.tsx` - Display all users with search, pagination, and actions
- `UserForm.tsx` - Reusable form for creating/editing users
- `UserDetail.tsx` - View detailed user information and preferences

**Services**: `src/services/userService.ts`

- CRUD operations for users
- User preferences management
- Type-safe API calls with TypeScript interfaces

**Routes**:

- `/users` - List all users
- `/users/create` - Create new user
- `/users/:id` - View user details
- `/users/:id/edit` - Edit user

**Design Pattern**: Following the meal module structure with consistent styling and user experience.

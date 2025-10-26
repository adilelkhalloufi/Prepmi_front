import { createBrowserRouter } from "react-router-dom";
import { webRoutes } from "./web";
import ErrorPage from "@/components/errors/general-error";
import LayoutLanding from "@/components/landing/LayoutLanding";
import loadable from "@loadable/component";
import ProgressBar from "@/components/loader/progressBar";
import SignIn from "@/pages/SignIn";
import RequireAuth from "./requireAuth";
import Layout from "@/components/dashboard/layout";
import Register from "@/pages/register/index";
import Checkout from "@/pages/checkout";
import LogoutPage from "@/pages/logoutPage";
import { ProfileForm } from "@/pages/dashboard/profile";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import CookieSettings from "@/pages/cookie-settings";
import { MenuPage } from "@/components/MenuPage";
import JoinNow from "@/pages/join-now";
import MealDetails from "@/pages/dashboard/meals/details";


const fallbackElement = <ProgressBar />;


const Dashboard = loadable(() => import('../pages/dashboard'), {
  fallback: fallbackElement,
});
const DashboardMeals = loadable(() => import('../pages/dashboard/meals'), {
  fallback: fallbackElement,
});

const DashboardMealsAdd = loadable(() => import('../pages/dashboard/meals/add'), {
  fallback: fallbackElement,
});

const DashboardMealsEdit = loadable(() => import('../pages/dashboard/meals/edit'), {
  fallback: fallbackElement,
});


// Weekly Menu Components
const WeeklyMenuManager = loadable(() => import('../pages/dashboard/weekly-menus/index'), {
  fallback: fallbackElement,
});
const WeeklyMenuCreate = loadable(() => import('../pages/dashboard/weekly-menus/add'), {
  fallback: fallbackElement,
});
const WeeklyMenuEdit = loadable(() => import('../pages/dashboard/weekly-menus/edit'), {
  fallback: fallbackElement,
});
const WeeklyMenuDetail = loadable(() => import('../pages/dashboard/weekly-menus/view'), {
  fallback: fallbackElement,
});



const UserManager = loadable(() => import('../pages/dashboard/users'), {
  fallback: fallbackElement,
});

const UserCreate = loadable(() => import('../pages/dashboard/users/add'), {
  fallback: fallbackElement,
});

const UserEdit = loadable(() => import('../pages/dashboard/users/edit'), {
  fallback: fallbackElement,
});

const UserView = loadable(() => import('../pages/dashboard/users/view'), {
  fallback: fallbackElement,
});

const OrderManger = loadable(() => import('../pages/dashboard/orders'), {
  fallback: fallbackElement,
});

const OrderCreate = loadable(() => import('../pages/dashboard/orders/add'), {
  fallback: fallbackElement,
});
const OrderEdit = loadable(() => import('../pages/dashboard/orders/edit'), {
  fallback: fallbackElement,
});
const OrderView = loadable(() => import('../pages/dashboard/orders/details'), {
  fallback: fallbackElement,
});

const MealPreparation = loadable(() => import('../pages/dashboard/meal-preparation'), {
  fallback: fallbackElement,
});

const PlanManager = loadable(() => import('../pages/dashboard/plans'), {
  fallback: fallbackElement,
});

const PlanCreate = loadable(() => import('../pages/dashboard/plans/add'), {
  fallback: fallbackElement,
});
const PlanEdit = loadable(() => import('../pages/dashboard/plans/edit'), {
  fallback: fallbackElement,
});
const PlanView = loadable(() => import('../pages/dashboard/plans/view'), {
  fallback: fallbackElement,
});

// categories components
const DashboardCategories = loadable(() => import('../pages/dashboard/categories'), {
  fallback: fallbackElement,
});

const DashboardCategoriesAdd = loadable(() => import('../pages/dashboard/categories/add'), {
  fallback: fallbackElement,
});
const DashboardCategoriesEdit = loadable(() => import('../pages/dashboard/categories/edit'), {
  fallback: fallbackElement,
});
const DashboardCategoriesView = loadable(() => import('../pages/dashboard/categories/details'), {
  fallback: fallbackElement,
});

const SingleMeal = loadable(() => import("../pages/SingleMeal"), {
  fallback: fallbackElement,
});

const ThankYouPage = loadable(() => import("../pages/thank-you"), {
  fallback: fallbackElement,
});
const Landing = loadable(() => import("../pages/landing"), {
  fallback: fallbackElement,
});


export const browserRouter = createBrowserRouter([
  {
    element: <LayoutLanding />,
    children: [
      {
        path: webRoutes.home,
        element: <Landing />,
      },
      {
        path: webRoutes.menu,
        element: <MenuPage />,
      },
      {
        path: webRoutes.meal_single,
        element: <SingleMeal />,
      },
      {
        path: webRoutes.join_now,
        element: <JoinNow />,
      },
      {
        path: webRoutes.register,
        element: <Register />,
      },
      {
        path: webRoutes.privacy_policy,
        element: <PrivacyPolicy />,
      },
      {
        path: webRoutes.terms_service,
        element: <TermsOfService />,
      },
      {
        path: webRoutes.cookie_settings,
        element: <CookieSettings />,
      },
      {
        path: webRoutes.thank_you,
        element: <ThankYouPage />,
      }


    ],
  },

  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: webRoutes.dashboard,
        element: <Dashboard />,
      },

      {
        path: webRoutes.dashboard_meals,
        element: <DashboardMeals />,
      },
      {
        path: webRoutes.dashboard_meals_add,
        element: <DashboardMealsAdd />,
      },
      {
        path: webRoutes.dashboard_meals_edit,
        element: <DashboardMealsEdit />,
      },
      // Weekly Menu Routes
      {
        path: webRoutes.dashboard_weekly_menus,
        element: <WeeklyMenuManager />,
      },
      {
        path: webRoutes.dashboard_weekly_menus_add,
        element: <WeeklyMenuCreate />,
      },
      {
        path: webRoutes.dashboard_weekly_menus_view,
        element: <WeeklyMenuDetail />,
      },
      {
        path: webRoutes.dashboard_weekly_menus_edit,
        element: <WeeklyMenuEdit />,
      },
      {
        path: webRoutes.dashboard_users,
        element: <UserManager />,
      },
      {
        path: webRoutes.dashboard_users_add,
        element: <UserCreate />,
      },
      {
        path: webRoutes.dashboard_users_edit,
        element: <UserEdit />,
      },
      {
        path: webRoutes.dashboard_users_view,
        element: <UserView />,
      },

      {
        path: webRoutes.dashboard_orders,
        element: <OrderManger />,
      },
      {
        path: webRoutes.dashboard_orders_add,
        element: <OrderCreate />,
      },
      {
        path: webRoutes.dashboard_orders_edit,
        element: <OrderEdit />,
      },
      {
        path: webRoutes.dashboard_orders_view,
        element: <OrderView />,
      },
      {
        path: webRoutes.dashboard_meal_preparation,
        element: <MealPreparation />,
      },
      {
        path: webRoutes.dashboard_plans,
        element: <PlanManager />,
      },
      {
        path: webRoutes.dashboard_plans_add,
        element: <PlanCreate />,
      },
      {
        path: webRoutes.dashboard_plans_edit,
        element: <PlanEdit />,
      },
      {
        path: webRoutes.dashboard_plans_view,
        element: <PlanView />,
      },
      {
        path: webRoutes.dashboard_categories,
        element: <DashboardCategories />,
      },
      {
        path: webRoutes.dashboard_categories_add,
        element: <DashboardCategoriesAdd />,
      },
      {
        path: webRoutes.dashboard_categories_edit,
        element: <DashboardCategoriesEdit />,
      },
      {
        path: webRoutes.dashboard_categories_view,
        element: <DashboardCategoriesView />,
      }

    ],
  },
  {
    element: (
      <RequireAuth>
        <LayoutLanding />
      </RequireAuth>
    ),
    children: [
      {
        path: webRoutes.checkout,
        element: <Checkout />,
      },

    ],
  },
  {
    path: webRoutes.login,
    element: <SignIn />,
    // errorElement: errorElement,
  },
  {
    path: webRoutes.logout,
    element: <LogoutPage />,
    // errorElement: errorElement,
  },



  {
    path: "*",
    element: <ErrorPage />,
    // errorElement: errorElement,
  },
]);

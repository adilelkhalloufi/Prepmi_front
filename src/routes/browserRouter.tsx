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

// Weekly Menu Components
const WeeklyMenuManager = loadable(() => import('../pages/dashboard/weekly-menus'), {
  fallback: fallbackElement,
});
const WeeklyMenuCreate = loadable(() => import('../pages/dashboard/weekly-menus/create'), {
  fallback: fallbackElement,
});
const WeeklyMenuEdit = loadable(() => import('../pages/dashboard/weekly-menus/edit'), {
  fallback: fallbackElement,
});
const WeeklyMenuDetail = loadable(() => import('../pages/dashboard/weekly-menus/detail'), {
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
      // Weekly Menu Routes
      {
        path: '/dashboard/weekly-menus',
        element: <WeeklyMenuManager />,
      },
      {
        path: '/dashboard/weekly-menus/create',
        element: <WeeklyMenuCreate />,
      },
      {
        path: '/dashboard/weekly-menus/:id',
        element: <WeeklyMenuDetail />,
      },
      {
        path: '/dashboard/weekly-menus/:id/edit',
        element: <WeeklyMenuEdit />,
      },
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

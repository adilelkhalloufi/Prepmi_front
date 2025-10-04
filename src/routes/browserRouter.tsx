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
const DashboardProduct = loadable(() => import('../pages/dashboard/product'), {
  fallback: fallbackElement,
});

const DashboardFavoris = loadable(() => import('../pages/dashboard/favoris'), {
  fallback: fallbackElement,
});

const DashboardOrder = loadable(() => import('../pages/dashboard/order'), {
  fallback: fallbackElement,
});

const DashboardOrderSeller = loadable(() => import('../pages/dashboard/seller_order'), {
  fallback: fallbackElement,
});

// const DashboardProfile = loadable(() => import('../pages/dashboard/profile'), {
//   fallback: fallbackElement,
// });
const Landing = loadable(() => import("../pages/landing"), {
  fallback: fallbackElement,
});
const Stagnant = loadable(() => import("../pages/ProductList"), {
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
        path: webRoutes.Dashboard,
        element: <Dashboard />,
      },
      {
        path: webRoutes.dashboard_product,
        element: <DashboardProduct />,
      }
      ,
      {
        path: webRoutes.dashboard_favris,
        element: <DashboardFavoris />,
      },
      {
        path: webRoutes.dashboard_order,
        element: <DashboardOrder />,
      },
      {
        path: webRoutes.dashboard_order_seller,
        element: <DashboardOrderSeller />,
      },
      {
        path: webRoutes.dashboard_profile,
        element: <ProfileForm />,
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

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { webRoutes } from "@/routes/web";
import { IconBasket, IconCactus, IconDashboard, IconLogin, IconRecycle, IconUser } from "@tabler/icons-react";
import i18next from "../i18n";
import { LangToggle } from "./lang-toggle";
import ThemeSwitcher from "./theme-switcher";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Badge } from "./ui/badge";
import logo from "../assets/Prepme.svg";
interface RouteProps {
  href: string;
  label: string;
}

export function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const routeList: RouteProps[] = [

    {
      href: webRoutes.menu,
      label: t("menu_meals"),
    },
    {
      href: "#how-it-works",
      label: t("menu_how_it_works"),
    },
    {
      href: "#pricing",
      label: t("menu_pricing"),
    },
    {
      href: "#about",
      label: t("menu_about"),
    },

  ];
  const cart = useSelector((state: RootState) => state.cart);
  const admin = useSelector((state: RootState) => state.admin?.user);
  console.log("admin in Header:", admin);
  return (
    <header className="fixed z-50 top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold flex items-center">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex text-center"
            >
              <img src={logo} alt="Prepme" className="h-8 w-auto" />
            </a>
          </span>
          <nav className="hidden md:flex ">
            {routeList.map((route: RouteProps, i) => (
              <a

                href={route.href}
                key={i}
                className="text-sm font-medium hover:text-primary m-2"
              >
                {route.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {/* <ThemeSwitcher /> */}
          <LangToggle />

          {/* <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => {
              // go to route basket
              navigate(webRoutes.checkout);
            }}
          >
            <IconBasket className="mr-2 w-5 h-5" />
            {cart.products.length > 0 && (<Badge variant="default" className="absolute top-0 right-0">
              {cart.products.length}
            </Badge>)}


          </Button> */}


          {/* Connection & Admin Panel */}
          {admin?.id ? (
            <Button
              variant="ghost"

              onClick={() => {
                navigate(webRoutes.dashboard);
              }}
            >
              <IconDashboard className="mr-2 w-5 h-5" />

            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={() => {
                navigate(webRoutes.login);
              }}
            >
              <IconLogin className="mr-2 w-5 h-5" />
              {t("menu_login")}
            </Button>
          )}

          {/* Get Started */}
          <Button
            onClick={() => {
              navigate(webRoutes.join_now);
            }}
          >
            {t("menu_get_started")}
          </Button>
        </div>
      </div>
    </header>
  );
}

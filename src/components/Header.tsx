import { Button } from "@/components/ui/button";
import {   Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useTranslation } from "react-i18next";
import { webRoutes } from "@/routes/web";
import { IconBasket, IconLogin, IconRecycle, IconUser } from "@tabler/icons-react";
import i18next from "../i18n";
import { LangToggle } from "./lang-toggle";
import ThemeSwitcher from "./theme-switcher";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Badge } from "./ui/badge";

interface RouteProps {
  href: string;
  label: string;
}

export function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const routeList: RouteProps[] = [
    {
      href: webRoutes.home,
      // label: "Home",
      label: t("menu_home"),
    },
    // {
    //   href: webRoutes.stagnant,
    //   //  label: "Scarp",
    //   label: t("menu_stagnant"),
    // },
    {
      href: webRoutes.scarp,
      //  label: "Scarp",
      label: t("menu_scrap"),
    },
    {
      href: "#about",
      label: t("menu_about"),
      // label: "About",
    },
    {
      href: "#contact",
      label: t("menu_contact"),
      // label: "Contact"  ,
    },
  ];
  const cart = useSelector((state: RootState) => state.cart);
  const admin = useSelector((state: RootState) => state.admin);

  return (
    <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold flex items-center">
            <IconRecycle />
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex text-center"
            >
              {t("website")}
            </a>
          </span>
          <nav className="hidden md:flex space-x-6">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className="text-sm font-medium hover:text-primary"
              >
                {route.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />
          <LangToggle />

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => {
              // go to route basket
              navigate(webRoutes.checkout);
            }}
          >
            <IconBasket className="mr-2 w-5 h-5" />
            {cart.products.length > 0 && (    <Badge  variant="default"    className="absolute top-0 right-0">
              {cart.products.length}
              </Badge>  )}
            
          
          </Button>
          {admin && (
            <Button
            variant="ghost"
              onClick={() => {
                navigate(webRoutes.Dashboard);
              }}
            >
               <IconUser/>
            </Button>
          )} 
          {!admin && ( <Button
            onClick={() => {
                navigate(webRoutes.login);
            }}
          >
            <IconLogin className="mr-2 w-5 h-5" />
            {t("login")}
          </Button>)}
         
        </div>
      </div>
    </header>
  );
}

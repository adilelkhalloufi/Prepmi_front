import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { webRoutes } from "@/routes/web";
import { IconDashboard, IconLogin, IconMenu2 } from "@tabler/icons-react";
import { LangToggle } from "./lang-toggle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import logo from "../assets/Prepme-simple.svg";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
interface RouteProps {
  href: string;
  label: string;
}

export function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routeList: RouteProps[] = [

    {
      href: webRoutes.menu,
      label: t("menu_meals"),
    },
    {
      href: webRoutes.membership_plans,
      label: t("menu_plans"),
    },
    {
      href: webRoutes.for_teams,
      label: t("menu_for_teams"),
    },
    {
      href: webRoutes.for_collab,
      label: t("menu_for_collab"),
    },
   

  ];
  const admin = useSelector((state: RootState) => state.admin?.user);
  return (
    <header className="fixed left-1/2 -translate-x-1/2 z-50 mt-7 rounded-lg top-0 w-3/4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold flex items-center">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex text-center"
            >
              <img src={logo} alt="Prepme" className="h-16 w-auto" width="400" height="120" />
            </a>
          </span>

        </div>
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
        <div className="flex items-center space-x-4">
          {/* <ThemeSwitcher /> */}

          <LangToggle />

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <IconMenu2 className="h-6 w-6" />
                <span className="sr-only">{t("menu_toggle", "Toggle menu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center">
                  <img src={logo} alt="Prepme" className="h-12 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6">
                {routeList.map((route: RouteProps, i) => (
                  <a
                    href={route.href}
                    key={i}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium hover:text-primary py-2 px-2 hover:bg-accent rounded-md transition-colors"
                  >
                    {route.label}
                  </a>
                ))}
                <div className="border-t pt-4 space-y-3">
                  {admin?.id ? (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate(webRoutes.dashboard);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <IconDashboard className="mr-2 w-5 h-5" />
                      {t("menu_dashboard", "Dashboard")}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate(webRoutes.login);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <IconLogin className="mr-2 w-5 h-5" />
                      {t("menu_login")}
                    </Button>
                  )}
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigate(webRoutes.join_now);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {t("menu_get_started")}
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>


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
              className="hidden md:flex"
              onClick={() => {
                navigate(webRoutes.dashboard);
              }}
            >
              <IconDashboard className="mr-2 w-5 h-5" />

            </Button>
          ) : (
            <Button
              variant="ghost"
              className="hidden md:flex"
              onClick={() => {
                navigate(webRoutes.login);
              }}
            >
              <IconLogin className="mr-2 w-5 h-5" />
              <span className="hidden sm:inline">
                {t("menu_login")}
              </span>
            </Button>
          )}

          {/* Get Started */}
          <Button
            onClick={() => {
              navigate(webRoutes.join_now);
            }}
            className="hidden md:flex"
          >
            {t("menu_get_started")}
          </Button>
        </div>
      </div>
    </header>
  );
}

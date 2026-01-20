import { Hero } from "@/components/Hero";

import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { useQuery } from "@tanstack/react-query";
import Footer from "@/components/Footer";
import { IconRefresh, IconScale, IconTruck, IconFlame, IconMeat } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ClientReviews } from "@/components/ClientReviews";
import { Button } from "@/components/ui/button";
import { webRoutes } from "@/routes/web";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const handleCardClick = (mealId: number) => {
    navigator(webRoutes.meal_single.replace(':id', mealId.toString() || ''));
  };
  const {
    data: meals,

  } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await http.get(apiRoutes.meals);
      const mealsData = res.data.data || res.data;
      // Limit to first 6 meals for the slider
      return Array.isArray(mealsData) ? mealsData.slice(0, 3) : [];
    },
  });
  return (
    <main>
      <Hero />
      {/* Features Section */}
      <div className="container grid md:grid-cols-3 gap-8 my-16 pt-8">
        {/* Rotating Menu */}
        <div className="flex flex-col items-center text-center space-y-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-700">
          <div className="w-12 h-12 flex items-center justify-center">
            <IconRefresh className="w-10 h-10 text-primary" stroke={1.5} />
          </div>
          <h3 className="text-primary font-bold text-2xl uppercase tracking-wide">
            {t("landing.rotating_menu_title", "ROTATING-MENU")}
          </h3>
          <p className="text-primary/80 text-lg">
            {t("landing.rotating_menu_desc1", "New delicious dishes")}
            <br />
            {t("landing.rotating_menu_desc2", "every week & daily")}
          </p>
        </div>

        {/* Nutritional Balance */}
        <div className="flex flex-col items-center text-center space-y-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-900">
          <div className="w-12 h-12 flex items-center justify-center">
            <IconScale className="w-10 h-10 text-primary" stroke={1.5} />
          </div>
          <h3 className="text-primary font-bold text-2xl uppercase tracking-wide">
            {t("landing.nutritional_title1", "NUTRITIONAL")}
            <br />
            {t("landing.nutritional_title2", "BALANCE")}
          </h3>
          <p className="text-primary/80 text-lg">
            {t("landing.nutritional_desc1", "Carefully balanced")}
            <br />
            {t("landing.nutritional_desc2", "macro nutrients")}
          </p>
        </div>

        {/* Convenient Delivery */}
        <div className="flex flex-col items-center text-center space-y-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-1000">
          <div className="w-12 h-12 flex items-center justify-center">
            <IconTruck className="w-10 h-10 text-primary" stroke={1.5} />
          </div>
          <h3 className="text-primary font-bold text-2xl uppercase tracking-wide">
            {t("landing.convenient_title1", "CONVENIENT")}
            <br />
            {t("landing.convenient_title2", "DELIVERY")}
          </h3>
          <p className="text-primary/80 text-lg">
            {t("landing.convenient_desc1", "On-the-go versatile")}
            <br />
            {t("landing.convenient_desc2", "meals")}
          </p>
        </div>
      </div>
      {/* Meals display */}
      <div className=" bg-primary  py-10 flex flex-col items-center">
        {/* add button see all the menu */}
        <Button
          onClick={() => {
            navigator(webRoutes.menu);
          }}
          className="text-white bg-secondary px-4 py-2 rounded-md mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          {t("see_all_menu")}
        </Button>
        <div className="flex flex-col md:flex-row  gap-4 justify-center">
          {meals?.map((meal: any, index: number) => (
            <div
              onClick={() => handleCardClick(meal.id)}
              key={meal.id}
              className="cursor-pointer flex flex-col p-2 items-center w-72 max-w-72 animate-in fade-in slide-in-from-bottom-6 duration-700"
              style={{ animationDelay: `${600 + index * 150}ms` }}
            >
              <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex-shrink-0 relative">
                {/* give image shadow down like light */}
                <img
                  src={meal.image_url || "./example1.png"}
                  alt={meal.name}
                  className="w-full h-full object-cover rounded-lg shadow-lg animate-in zoom-in duration-700"
                  style={{ animationDelay: `${700 + index * 150}ms` }}
                />
              </div>
              <div className="rounded-lg   bg-background/95  supports-[backdrop-filter]:bg-background/20 flex flex-col p-2 items-center">
                <p className="text-white text-center mt-4 font-semibold text-lg min-h-[3.5rem] flex items-center justify-center">
                  {meal.name}
                </p>

                <div className="flex space-x-4 mt-2 p-2">
                  <span className="text-white text-sm flex items-center gap-1">
                    {meal.nutrition.calories} {t("calories")}
                    <IconFlame className="w-4 h-4 text-orange-400" />
                  </span>
                  <span className="text-white text-sm">|</span>
                  <span className="text-white text-sm flex items-center gap-1">
                    {meal.nutrition.protein}g {t("protein")}
                    <IconMeat className="w-4 h-4 text-red-400" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ClientReviews />

      <Footer />
    </main>
  );
};

export default Index;

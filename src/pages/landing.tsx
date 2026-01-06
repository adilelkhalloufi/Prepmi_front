import { Hero } from "@/components/Hero";

import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { useQuery } from "@tanstack/react-query";
import Footer from "@/components/Footer";
import { IconRefresh, IconScale, IconTruck, IconFlame, IconMeat } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ClientReviews } from "@/components/ClientReviews";
import { MoroccanReviews } from "@/components/MoroccanReviews";

const Index = () => {
  const { t } = useTranslation();
  const {
    data: meals,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await http.get(apiRoutes.meals);
      const mealsData = res.data.data || res.data;
      console.log("Fetched meals:", mealsData);
      // Limit to first 6 meals for the slider
      return Array.isArray(mealsData) ? mealsData.slice(0, 3) : [];
    },
  });
  return (
    <main>
      <Hero meals={meals} />
      {/* Features Section */}
      <div className="container grid md:grid-cols-3 gap-8 my-16 pt-8">
        {/* Rotating Menu */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <IconRefresh className="w-10 h-10 text-primary" stroke={1.5} />
          </div>
          <h3 className="text-primary font-bold text-2xl uppercase tracking-wide">
            ROTATING-MENU
          </h3>
          <p className="text-primary/80 text-lg">
            New delicious dishes
            <br />
            every week & daily
          </p>
        </div>

        {/* Nutritional Balance */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <IconScale className="w-10 h-10 text-primary" stroke={1.5} />
          </div>
          <h3 className="text-primary font-bold text-2xl uppercase tracking-wide">
            NUTRITIONAL
            <br />
            BALANCE
          </h3>
          <p className="text-primary/80 text-lg">
            Carefully balanced
            <br />
            macro nutrients
          </p>
        </div>

        {/* Convenient Delivery */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <IconTruck className="w-10 h-10 text-primary" stroke={1.5} />
          </div>
          <h3 className="text-primary font-bold text-2xl uppercase tracking-wide">
            CONVENIENT
            <br />
            DELIVERY
          </h3>
          <p className="text-primary/80 text-lg">
            On-the-go versatile
            <br />
            meals
          </p>
        </div>
      </div>
      {/* Meals display */}
      <div className=" bg-primary  py-10 flex flex-col items-center">
        {/* add button see all the menu */}
        <button className="text-white bg-secondary px-4 py-2 rounded-md mb-4  ">
          {t("see_all_menu")}
        </button>
        <div className="flex flex-col md:flex-row  gap-4 justify-center">
          {meals?.map((meal: any) => (
            <div
              key={meal.id}
              className=" flex flex-col p-2 items-center w-72 max-w-72"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex-shrink-0 relative">
                {/* give image shadow down like light */}
                <img
                  src="./example1.png"
                  alt={meal.name}
                  className="w-full h-full object-cover rounded-lg shadow-lg "
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

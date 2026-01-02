import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { HowItWorks } from "@/components/HowItWorks";
import { FreshMeals } from "@/components/FreshMeals";
import { MenuSlider } from "@/components/MenuSlider";
import { MoroccanReviews } from "@/components/MoroccanReviews";
import { Newsletter } from "@/components/Newsletter";
import { Why } from "@/components/Why";
import http from "@/utils/http";
import { apiRoutes } from "@/routes/api";
import { useQuery } from "@tanstack/react-query";
import Footer from "@/components/Footer";
import { IconRefresh, IconScale, IconTruck } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

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
      <div className="grid md:grid-cols-3 gap-8 my-16 pt-8">
        {/* Rotating Menu */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <IconRefresh className="w-10 h-10 text-primary" stroke={1.5} />
          </div>
          <h3 className="text-primary font-bold text-lg uppercase tracking-wide">
            ROTATING-MENU
          </h3>
          <p className="text-primary/80 text-sm">
            New delicious dishes<br />
            every week & daily
          </p>
        </div>

        {/* Nutritional Balance */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <IconScale className="w-10 h-10 text-primary" stroke={1.5} />
          </div>
          <h3 className="text-primary font-bold text-lg uppercase tracking-wide">
            NUTRITIONAL<br />
            BALANCE
          </h3>
          <p className="text-primary/80 text-sm">
            Carefully balanced<br />
            macro nutrients
          </p>
        </div>

        {/* Convenient Delivery */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <IconTruck className="w-10 h-10 text-primary" stroke={1.5} />
          </div>
          <h3 className="text-primary font-bold text-lg uppercase tracking-wide">
            CONVENIENT<br />
            DELIVERY
          </h3>
          <p className="text-primary/80 text-sm">
            On-the-go versatile<br />
            meals
          </p>
        </div>
      </div>


      <div className=" bg-primary  py-10 flex flex-col items-center">
        {/* add button see all the menu */}
        <button className="text-white bg-secondary px-4 py-2 rounded-md mb-4  ">
          {t("see_all_menu")}
        </button>
        <div className="flex flex-col md:flex-row  gap-4 justify-center">
          {meals?.map((meal: any) => (
            <div
              key={meal.id}
              className="rounded-lg   bg-background/95  supports-[backdrop-filter]:bg-background/20 flex flex-col p-2 items-center w-72 max-w-72"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex-shrink-0 relative">
                <img
                  src='./example1.png'
                  alt={meal.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-white text-center mt-4 font-semibold text-lg min-h-[3.5rem] flex items-center justify-center">
                {meal.name}
              </p>
              {/* Show calories and protein */}
              <div className="flex space-x-4 mt-2 p-2">
                <span className="text-white text-sm">
                  {meal.nutrition.calories} {t("calories")}
                </span>
                <span className="text-white text-sm">|</span>
                <span className="text-white text-sm">
                  {meal.nutrition.protein}g {t("protein")}
                </span>
              </div>
            </div>
          ))}
        </div>


      </div>
      {/* <MenuSlider /> */}

      {/* <HowItWorks />
      <FreshMeals />
      <MoroccanReviews />
      <About />
      <Newsletter /> */}
      <Footer />
      {/* <Why meals={meals} />
      <Footer2 /> */}

    </main >
  );
};

export default Index;

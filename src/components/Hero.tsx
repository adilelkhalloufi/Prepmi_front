import http from "@/utils/http";
import { Header2 } from "./Header2";
import { webRoutes } from "@/routes/web";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "@/routes/api";
import { useQuery } from "@tanstack/react-query";

export function Hero({ meals }) {
  const { t } = useTranslation();
  const navigator = useNavigate();

  // Fetch meals using React Query
 
  return (
    <section className="relative overflow-hidden bg-mainbackground bg-center bg-cover bg-fixed flex items-center justify-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="container relative z-10">
        <div className=" items-center mt-32">
          {/* Content Section */}
          <div className="text-center lg:text-left space-y-8 z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter text-white text-center">
              {t("hero_title")}
            </h1>
            <p className="text-lg md:text-xl text-white/90   mx-auto lg:mx-0 text-center">
              {t("hero_description")}{" "}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center  ">
              <button
                className="bg-red-500 text-white hover:bg-red-600 font-semibold px-8 py-4 text-lg rounded-lg"
                onClick={() => {
                  navigator(webRoutes.join_now);
                }}
              >
                {t("hero_get_started")}
              </button>
            </div>
          </div>
        </div>
        <div className="container   pt-10 flex gap-4  flex-col md:flex-row  justify-center pb-4">
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
    </section>
  );
}

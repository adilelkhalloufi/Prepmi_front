import { webRoutes } from "@/routes/web";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IconRefresh, IconScale, IconTruck } from "@tabler/icons-react";

export function Hero({ meals }) {
  const { t } = useTranslation();
  const navigator = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#1e4d3a] min-h-[600px] flex items-center">
      <div className="container  px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white uppercase">
              HEALTHY<br />
              MEALS<br />
              DELIVERED
            </h1>
            <button
              className="bg-[#b52e3a] hover:bg-[#9a2530] text-white font-semibold px-10 py-3 text-lg rounded-md transition-colors duration-200"
              onClick={() => {
                navigator(webRoutes.join_now);
              }}
            >
              GET STARTED
            </button>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <img
                src="/hero.png"
                alt="Healthy meal prep containers"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
}

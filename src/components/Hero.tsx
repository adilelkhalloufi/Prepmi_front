import { webRoutes } from "@/routes/web";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Hero() {
  const navigator = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-primary min-h-[600px] flex items-center">
      <div className="container  px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Right Image - Shows first on mobile */}
          <div className="flex justify-center lg:justify-end lg:flex-1 order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
            <div className="relative w-full max-w-lg lg:max-w-xl">
              <img
                src="/hero.png"
                alt={t("hero_alt_text")}
                className="w-full h-auto object-contain drop-shadow-2xl  rotate-[-30deg] scale-150"
              />
            </div>
          </div>

          {/* Left Content - Shows second on mobile */}
          <div className="text-center z-30 lg:text-left space-y-6 lg:space-y-8 lg:flex-shrink-0 order-2 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-1000">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-white uppercase animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
              {t("hero_title").split(' ').map((word, index) => (
                <span key={index}>
                  {word}
                  {index < t("hero_title").split(' ').length - 1 && <br />}
                </span>
              ))}
            </h1>
            <button
              className="bg-[#b52e3a] hover:bg-[#9a2530] text-white font-semibold px-10 py-3 text-lg rounded-md transition-colors duration-200 animate-in fade-in slide-in-from-bottom-4  delay-500"
              onClick={() => {
                navigator(webRoutes.join_now);
              }}
            >
              {t("hero_get_started")}
            </button>
          </div>
        </div>


      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button"
import { webRoutes } from "@/routes/web";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const { t } = useTranslation();
  const navigator = useNavigate();
  return (
    <section className="relative  flex items-center justify-center overflow-hidden hero-gradient">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full animate-float-delay"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-white rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-white rounded-full animate-pulse-slow"></div>
      </div>

      <div className="container px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="text-center lg:text-left space-y-8 z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter text-white">
              {t('hero_title')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-[600px] mx-auto lg:mx-0">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg"
                onClick={() => {
                  navigator(webRoutes.register || "/register")
                }}
              >
                {t('hero_get_started')}
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 text-lg"
                onClick={() => {
                  navigator("#meals")
                }}
              >
                {t('menu_meals')}
              </Button> */}
            </div>
          </div>

          {/* Image Section */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main meal image with floating animation */}
              <div className="animate-float">
                <img
                  src="/healthy-meal-bowl.png"
                  alt="Healthy Meal Bowl"
                  className="w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] object-cover rounded-full shadow-2xl border-8 border-white/20"
                />
              </div>

              {/* Floating food elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-white/20 rounded-full animate-bounce-slow backdrop-blur-sm"></div>
              <div className="absolute -bottom-4 -left-8 w-12 h-12 bg-white/20 rounded-full animate-float-delay backdrop-blur-sm"></div>
              <div className="absolute top-1/4 -left-12 w-8 h-8 bg-white/20 rounded-full animate-pulse-slow backdrop-blur-sm"></div>
              <div className="absolute bottom-1/3 -right-12 w-10 h-10 bg-white/20 rounded-full animate-float backdrop-blur-sm"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent animate-pulse-slow bg-mainbackground"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
          <path d="M0,120 C150,40 350,40 600,80 C850,120 1050,120 1200,80 L1200,120 Z" fill="hsl(var(--background))"></path>
        </svg>
      </div>
    </section>
  )
}
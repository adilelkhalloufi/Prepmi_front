import { Button } from "@/components/ui/button"
import { webRoutes } from "@/routes/web";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function HeroVariant1() {
    const { t } = useTranslation();
    const navigator = useNavigate();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600">
            {/* Animated background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-bounce"></div>

            <div className="container px-4 py-16 md:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left space-y-8 z-10">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter text-white">
                            {t('hero_title')}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-[600px] mx-auto lg:mx-0">
                            {t('hero_description')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button
                                size="lg"
                                className="bg-white text-green-600 hover:bg-white/90 font-semibold px-8 py-4 text-lg shadow-xl"
                                onClick={() => navigator(webRoutes.join_now)}
                            >
                                {t('hero_get_started')}
                            </Button>
                        </div>
                    </div>

                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="animate-float">
                                <img
                                    src="/healthy-meal-bowl.png"
                                    alt="Healthy Meal Bowl"
                                    className="w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] object-cover rounded-full shadow-2xl border-8 border-white/20"
                                />
                            </div>
                            <div className="absolute -top-8 -right-8 w-16 h-16 bg-yellow-400/30 rounded-full animate-bounce backdrop-blur-sm"></div>
                            <div className="absolute -bottom-4 -left-8 w-12 h-12 bg-orange-400/30 rounded-full animate-pulse backdrop-blur-sm"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
                    <path d="M0,120 C150,40 350,40 600,80 C850,120 1050,120 1200,80 L1200,120 Z" fill="hsl(var(--background))"></path>
                </svg>
            </div>
        </section>
    );
}

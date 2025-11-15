import { Button } from "@/components/ui/button"
import { webRoutes } from "@/routes/web";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function HeroVariant4() {
    const { t } = useTranslation();
    const navigator = useNavigate();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500">
            {/* Dynamic geometric shapes */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-32 right-32 w-24 h-24 bg-yellow-300/30 rounded-full animate-bounce"></div>
            <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-green-400/40 transform rotate-12 animate-pulse"></div>

            <div className="container px-4 py-16 md:py-24 relative z-10">
                <div className="text-center space-y-12">
                    <div className="space-y-6">
                        <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-lg font-bold">
                            ⚡ Energy • Nutrition • Life
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight text-white">
                            {t('hero_title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-medium">
                            {t('hero_description')}
                        </p>
                    </div>

                    <div className="relative max-w-2xl mx-auto">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
                            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                                <img
                                    src="/healthy-meal-bowl.png"
                                    alt="Healthy Meal Bowl"
                                    className="w-full h-80 object-cover rounded-2xl"
                                />

                                {/* Nutritional highlights */}
                                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    High Protein
                                </div>
                                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    Vitamin Rich
                                </div>
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    Low Calorie
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Button
                            size="lg"
                            className="bg-white text-purple-600 hover:bg-white/90 font-bold px-12 py-4 text-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-transform"
                            onClick={() => navigator(webRoutes.join_now)}
                        >
                            {t('hero_get_started')} 🚀
                        </Button>
                        <div className="flex items-center gap-2 text-white/80">
                            <span>⭐⭐⭐⭐⭐</span>
                            <span className="font-medium">1000+ Happy Customers</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

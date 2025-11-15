import { Button } from "@/components/ui/button"
import { webRoutes } from "@/routes/web";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function HeroVariant3() {
    const { t } = useTranslation();
    const navigator = useNavigate();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 to-emerald-100">
            {/* Organic shapes */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-green-200/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-200/30 rounded-[60%] blur-2xl"></div>
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-orange-200/20 rounded-[45%] blur-xl"></div>

            <div className="container px-4 py-16 md:py-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium">
                            🌱 100% Natural & Organic
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-green-900">
                            {t('hero_title')}
                        </h1>
                        <p className="text-lg md:text-xl text-green-700 max-w-[600px]">
                            {t('hero_description')}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 py-6">
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-green-800">100%</div>
                                <div className="text-sm text-green-600">Organic</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-green-800">Fresh</div>
                                <div className="text-sm text-green-600">Daily</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-green-800">Local</div>
                                <div className="text-sm text-green-600">Sourced</div>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="bg-primary hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg rounded-2xl shadow-lg"
                            onClick={() => navigator(webRoutes.join_now)}
                        >
                            {t('hero_get_started')}
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                            <img
                                src="/healthy-meal-bowl.png"
                                alt="Healthy Meal Bowl"
                                className="w-full h-96 object-cover rounded-2xl"
                            />

                            {/* Floating ingredients */}
                            <div className="absolute -top-6 -left-6 bg-white rounded-full p-4 shadow-lg animate-float">
                                <span className="text-3xl">🥑</span>
                            </div>
                            <div className="absolute top-10 -right-6 bg-white rounded-full p-4 shadow-lg animate-float animation-delay-300">
                                <span className="text-3xl">🥒</span>
                            </div>
                            <div className="absolute -bottom-6 left-10 bg-white rounded-full p-4 shadow-lg animate-float animation-delay-600">
                                <span className="text-3xl">🌿</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

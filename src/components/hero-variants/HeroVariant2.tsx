import { Button } from "@/components/ui/button"
import { webRoutes } from "@/routes/web";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function HeroVariant2() {
    const { t } = useTranslation();
    const navigator = useNavigate();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

            <div className="container px-4 py-16 md:py-24 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <div className="space-y-8">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight tracking-tight text-gray-900">
                            {t('hero_title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
                            {t('hero_description')}
                        </p>
                    </div>

                    <div className="relative inline-block">
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                            <img
                                src="/healthy-meal-bowl.png"
                                alt="Healthy Meal Bowl"
                                className="w-96 h-96 md:w-[500px] md:h-[400px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        {/* Floating nutrition icons */}
                        <div className="absolute -top-4 -left-4 bg-green-100 p-3 rounded-full animate-bounce">
                            <span className="text-2xl">🥬</span>
                        </div>
                        <div className="absolute -top-4 -right-4 bg-orange-100 p-3 rounded-full animate-bounce animation-delay-300">
                            <span className="text-2xl">🥕</span>
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-red-100 p-3 rounded-full animate-bounce animation-delay-600">
                            <span className="text-2xl">🍅</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            size="lg"
                            className="bg-green-600 hover:bg-green-700 text-white font-medium px-12 py-4 text-lg rounded-full shadow-lg"
                            onClick={() => navigator(webRoutes.join_now)}
                        >
                            {t('hero_get_started')}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"
import {
    Flame,
    Zap,
    Clock,
    ChefHat,
    Leaf,
    Wheat,
    Milk,
    Nut,
    Heart,
    Star
} from "lucide-react"
import { MealCard } from "./MealCard"

interface Meal {
    name: string;
    slug: string;
    description: string;
    short_description: string;
    image_path: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fats: number;
    fiber: number;
    is_vegetarian: boolean;
    is_vegan: boolean;
    is_gluten_free: boolean;
    is_dairy_free: boolean;
    is_nut_free: boolean;
    is_keto: boolean;
    is_paleo: boolean;
    is_low_carb: boolean;
    is_high_protein: boolean;
    is_spicy: boolean;
    spice_level: number;
    prep_time_minutes: number;
    cooking_time_minutes: number;
    difficulty_level: 'Easy' | 'Medium' | 'Hard';
    price: number;
}

// Mock data - you can replace this with real data
const mockMeals: Meal[] = [
    {
        name: "CHICKEN & MUSHROOM ORZOTTO",
        slug: "chicken-mushroom-orzotto",
        description: "Creamy orzo pasta with tender chicken and savory mushrooms in a rich, herb-infused sauce",
        short_description: "Creamy orzo with chicken and mushrooms",
        image_path: "/healthy-meal-bowl.png",
        calories: 603,
        protein: 50.4,
        carbohydrates: 42,
        fats: 18,
        fiber: 4,
        is_vegetarian: false,
        is_vegan: false,
        is_gluten_free: false,
        is_dairy_free: false,
        is_nut_free: true,
        is_keto: false,
        is_paleo: false,
        is_low_carb: false,
        is_high_protein: true,
        is_spicy: false,
        spice_level: 0,
        prep_time_minutes: 15,
        cooking_time_minutes: 25,
        difficulty_level: 'Medium',
        price: 12.99
    },
    {
        name: "MEDITERRANEAN QUINOA BOWL",
        slug: "mediterranean-quinoa-bowl",
        description: "Fresh quinoa with roasted vegetables, feta cheese, and Mediterranean herbs",
        short_description: "Healthy quinoa bowl with Mediterranean flavors",
        image_path: "/healthy-meal-bowl.png",
        calories: 485,
        protein: 22.1,
        carbohydrates: 58,
        fats: 16,
        fiber: 8,
        is_vegetarian: true,
        is_vegan: false,
        is_gluten_free: true,
        is_dairy_free: false,
        is_nut_free: true,
        is_keto: false,
        is_paleo: false,
        is_low_carb: false,
        is_high_protein: false,
        is_spicy: false,
        spice_level: 0,
        prep_time_minutes: 10,
        cooking_time_minutes: 20,
        difficulty_level: 'Easy',
        price: 11.99
    },
    {
        name: "SPICY SALMON TERIYAKI",
        slug: "spicy-salmon-teriyaki",
        description: "Grilled salmon glazed with spicy teriyaki sauce, served with steamed vegetables",
        short_description: "Grilled salmon with spicy teriyaki glaze",
        image_path: "/healthy-meal-bowl.png",
        calories: 520,
        protein: 38.5,
        carbohydrates: 24,
        fats: 28,
        fiber: 3,
        is_vegetarian: false,
        is_vegan: false,
        is_gluten_free: true,
        is_dairy_free: true,
        is_nut_free: true,
        is_keto: false,
        is_paleo: true,
        is_low_carb: true,
        is_high_protein: true,
        is_spicy: true,
        spice_level: 2,
        prep_time_minutes: 12,
        cooking_time_minutes: 18,
        difficulty_level: 'Medium',
        price: 15.99
    },
    {
        name: "VEGAN POWER BOWL",
        slug: "vegan-power-bowl",
        description: "Nutrient-packed bowl with lentils, quinoa, roasted vegetables, and tahini dressing",
        short_description: "Plant-based power bowl with superfoods",
        image_path: "/healthy-meal-bowl.png",
        calories: 456,
        protein: 18.2,
        carbohydrates: 65,
        fats: 14,
        fiber: 12,
        is_vegetarian: true,
        is_vegan: true,
        is_gluten_free: true,
        is_dairy_free: true,
        is_nut_free: false,
        is_keto: false,
        is_paleo: false,
        is_low_carb: false,
        is_high_protein: false,
        is_spicy: false,
        spice_level: 0,
        prep_time_minutes: 15,
        cooking_time_minutes: 30,
        difficulty_level: 'Easy',
        price: 10.99
    }
];

export function MenuSlider() {
    const { t } = useTranslation();

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

            <div className="container px-4 md:px-6 relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                        <span className="text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                            {t('menu.badge')}
                        </span>
                        <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent mb-4 leading-tight">
                        {t('menu.title')}
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        {t('menu.description')}
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {mockMeals.map((meal, index) => (
                                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                    <MealCard meal={meal} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4 bg-primary/10 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground" />
                        <CarouselNext className="right-4 bg-primary/10 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground" />
                    </Carousel>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-muted-foreground mb-6 text-lg">{t('menu.cta_text')}</p>
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent to-primary rounded-full"></div>
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary to-transparent rounded-full"></div>
                        <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                        <div className="w-16 h-1 bg-gradient-to-r from-secondary to-transparent rounded-full"></div>
                    </div>
                    <button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-bold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1">
                        {t('menu.view_full_menu')}
                    </button>
                </div>
            </div>
        </section>
    );
}
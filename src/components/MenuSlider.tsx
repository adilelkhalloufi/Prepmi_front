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

    const getDietaryIcons = (meal: Meal) => {
        const icons = [];
        if (meal.is_vegan) icons.push({ icon: <Leaf className="w-3 h-3" />, label: t('menu.vegan'), color: "bg-green-100 text-green-700" });
        else if (meal.is_vegetarian) icons.push({ icon: <Leaf className="w-3 h-3" />, label: t('menu.vegetarian'), color: "bg-green-100 text-green-700" });
        if (meal.is_gluten_free) icons.push({ icon: <Wheat className="w-3 h-3" />, label: t('menu.gluten_free'), color: "bg-yellow-100 text-yellow-700" });
        if (meal.is_high_protein) icons.push({ icon: <Zap className="w-3 h-3" />, label: t('menu.high_protein'), color: "bg-blue-100 text-blue-700" });
        if (meal.is_keto) icons.push({ icon: <Heart className="w-3 h-3" />, label: t('menu.keto'), color: "bg-purple-100 text-purple-700" });
        if (meal.is_spicy) icons.push({ icon: <Flame className="w-3 h-3" />, label: t('menu.spicy'), color: "bg-red-100 text-red-700" });
        return icons.slice(0, 3); // Show max 3 badges
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-700';
            case 'Medium': return 'bg-yellow-100 text-yellow-700';
            case 'Hard': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-background to-muted/20">
            <div className="container px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-6">
                        <span className="text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 px-4 py-2 rounded-full">
                            {t('menu.badge')}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
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
                                    <Card className="group h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-card/80 backdrop-blur-sm overflow-hidden">
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={meal.image_path}
                                                alt={meal.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            {/* Price Badge */}
                                            <div className="absolute top-4 right-4">
                                                <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1 hover:!bg-primary hover:!text-primary-foreground">
                                                    ${meal.price}
                                                </Badge>
                                            </div>

                                            {/* Difficulty Badge */}
                                            <div className="absolute top-4 left-4">
                                                <Badge className={`${getDifficultyColor(meal.difficulty_level)} font-medium px-2 py-1 text-xs pointer-events-none`}>
                                                    <ChefHat className="w-3 h-3 mr-1" />
                                                    {meal.difficulty_level}
                                                </Badge>
                                            </div>
                                        </div>

                                        <CardContent className="p-6">
                                            {/* Meal Name */}
                                            <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                                                {meal.name}
                                            </h3>

                                            {/* Short Description */}
                                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                                {meal.short_description}
                                            </p>

                                            {/* Nutrition Info */}
                                            <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
                                                <div className="flex items-center space-x-4 text-sm">
                                                    <div className="flex items-center space-x-1">
                                                        <Flame className="w-4 h-4 text-orange-500" />
                                                        <span className="font-semibold">{meal.calories}</span>
                                                        <span className="text-muted-foreground text-xs">{t('menu.kcal')}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <Zap className="w-4 h-4 text-blue-500" />
                                                        <span className="font-semibold">{meal.protein}g</span>
                                                        <span className="text-muted-foreground text-xs">{t('menu.protein')}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Dietary Badges */}
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {getDietaryIcons(meal).map((item, i) => (
                                                    <Badge key={i} className={`${item.color} font-medium px-2 py-1 text-xs flex items-center space-x-1 pointer-events-none`}>
                                                        {item.icon}
                                                        <span>{item.label}</span>
                                                    </Badge>
                                                ))}
                                            </div>

                                            {/* Time Info */}
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{meal.prep_time_minutes + meal.cooking_time_minutes} {t('menu.mins')}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Star className="w-3 h-3 text-yellow-500" />
                                                    <span>{t('menu.chef_crafted')}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <p className="text-muted-foreground mb-4">{t('menu.cta_text')}</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full"></div>
                </div>
            </div>
        </section>
    );
}
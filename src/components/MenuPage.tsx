import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"
import { MealCard } from "./MealCard"
import {
    Calendar,
    ChefHat,
    Coffee,
    Utensils,
    Wine,
    Sparkles,
    Filter,
    Clock,
    TrendingUp
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
    category: 'weekly' | 'breakfast' | 'drinks';
    available_date?: string;
}

const mockMeals: Meal[] = [
    // Weekly meals with dates
    {
        name: "Mediterranean Grilled Chicken",
        slug: "mediterranean-grilled-chicken",
        description: "Juicy grilled chicken with Mediterranean herbs and vegetables",
        short_description: "Herb-crusted chicken with roasted vegetables",
        image_path: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400",
        calories: 450,
        protein: 35,
        carbohydrates: 25,
        fats: 18,
        fiber: 6,
        is_vegetarian: false,
        is_vegan: false,
        is_gluten_free: true,
        is_dairy_free: false,
        is_nut_free: true,
        is_keto: false,
        is_paleo: true,
        is_low_carb: true,
        is_high_protein: true,
        is_spicy: false,
        spice_level: 0,
        prep_time_minutes: 20,
        cooking_time_minutes: 25,
        difficulty_level: 'Medium',
        price: 18.99,
        category: 'weekly',
        available_date: '2024-10-06'
    },
    // Breakfast items
    {
        name: "Avocado Toast Supreme",
        slug: "avocado-toast-supreme",
        description: "Artisanal sourdough topped with smashed avocado, poached egg, and microgreens",
        short_description: "Fresh avocado on sourdough with poached egg",
        image_path: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400",
        calories: 320,
        protein: 14,
        carbohydrates: 28,
        fats: 18,
        fiber: 8,
        is_vegetarian: true,
        is_vegan: false,
        is_gluten_free: false,
        is_dairy_free: true,
        is_nut_free: true,
        is_keto: false,
        is_paleo: false,
        is_low_carb: false,
        is_high_protein: false,
        is_spicy: false,
        spice_level: 0,
        prep_time_minutes: 10,
        cooking_time_minutes: 5,
        difficulty_level: 'Easy',
        price: 12.99,
        category: 'breakfast'
    },
    // Drinks
    {
        name: "Green Goddess Smoothie",
        slug: "green-goddess-smoothie",
        description: "Energizing blend of spinach, mango, pineapple, and coconut water",
        short_description: "Refreshing green smoothie with tropical fruits",
        image_path: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400",
        calories: 180,
        protein: 4,
        carbohydrates: 38,
        fats: 2,
        fiber: 6,
        is_vegetarian: true,
        is_vegan: true,
        is_gluten_free: true,
        is_dairy_free: true,
        is_nut_free: true,
        is_keto: false,
        is_paleo: true,
        is_low_carb: false,
        is_high_protein: false,
        is_spicy: false,
        spice_level: 0,
        prep_time_minutes: 5,
        cooking_time_minutes: 0,
        difficulty_level: 'Easy',
        price: 8.99,
        category: 'drinks'
    }
];

const weeklyDates = [
    { date: '2024-10-06', day: 'Sunday' },
    { date: '2024-10-07', day: 'Monday' },
    { date: '2024-10-08', day: 'Tuesday' },
    { date: '2024-10-09', day: 'Wednesday' },
    { date: '2024-10-10', day: 'Thursday' },
];

export function MenuPage() {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState<'weekly' | 'breakfast' | 'drinks'>('weekly');
    const [selectedDate, setSelectedDate] = useState<string>('2024-10-06');
    const [isAnimating, setIsAnimating] = useState(false);

    const categories = [
        {
            id: 'weekly' as const,
            name: t('menu.weekly_menu') || 'Weekly Menu',
            icon: <Calendar className="w-5 h-5" />,
            color: 'from-primary/20 to-primary/10',
            accent: 'border-primary/30 text-primary'
        },
        {
            id: 'breakfast' as const,
            name: t('menu.breakfasts_snacks') || 'Breakfasts & Snacks',
            icon: <Coffee className="w-5 h-5" />,
            color: 'from-secondary/20 to-secondary/10',
            accent: 'border-secondary/30 text-secondary'
        },
        {
            id: 'drinks' as const,
            name: t('menu.drinks') || 'Drinks',
            icon: <Wine className="w-5 h-5" />,
            color: 'from-accent/20 to-accent/10',
            accent: 'border-accent/30 text-accent'
        }
    ];

    const handleCategoryChange = (category: 'weekly' | 'breakfast' | 'drinks') => {
        setIsAnimating(true);
        setTimeout(() => {
            setActiveCategory(category);
            setIsAnimating(false);
        }, 150);
    };

    const filteredMeals = mockMeals.filter(meal => {
        if (activeCategory === 'weekly') {
            return meal.category === 'weekly' && meal.available_date === selectedDate;
        }
        return meal.category === activeCategory;
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border-b border-border/50">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="container mx-auto px-4 py-16 relative">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
                            <Sparkles className="w-4 h-4" />
                            <span>{t('menu.fresh_daily') || 'Fresh Daily'}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent mb-6">
                            {t('menu.our_menu') || 'Our Menu'}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {t('menu.description_page') || 'Discover our carefully crafted meals, made with fresh ingredients and designed to fuel your healthy lifestyle.'}
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                            className={`group relative overflow-hidden px-8 py-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${activeCategory === category.id
                                ? `${category.accent} bg-gradient-to-r ${category.color} shadow-lg shadow-primary/10`
                                : 'border-border/50 hover:border-primary/30 bg-card/50 hover:bg-card'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg transition-all duration-300 ${activeCategory === category.id
                                    ? 'bg-primary/20'
                                    : 'bg-muted/50 group-hover:bg-primary/10'
                                    }`}>
                                    {category.icon}
                                </div>
                                <span className="font-semibold text-lg">
                                    {category.name}
                                </span>
                            </div>
                            {activeCategory === category.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Date Selection for Weekly Menu */}
                {activeCategory === 'weekly' && (
                    <div className="mb-12">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-foreground mb-2">
                                {t('menu.week_of') || 'Week of'} October 6-10, 2024
                            </h2>
                            <p className="text-muted-foreground">
                                {t('menu.select_date') || 'Select a date to view available meals'}
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {weeklyDates.map((dateObj) => (
                                <button
                                    key={dateObj.date}
                                    onClick={() => setSelectedDate(dateObj.date)}
                                    className={`group relative px-6 py-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${selectedDate === dateObj.date
                                        ? 'border-primary bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-lg shadow-primary/10'
                                        : 'border-border/50 hover:border-primary/30 bg-card/50 hover:bg-card text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    <div className="text-center">
                                        <div className="text-sm font-medium mb-1">
                                            {dateObj.day}
                                        </div>
                                        <div className="text-lg font-bold">
                                            {formatDate(dateObj.date)}
                                        </div>
                                    </div>
                                    {selectedDate === dateObj.date && (
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Stats Card */}
                <Card className="mb-12 bg-gradient-to-r from-card/90 to-card/70 border-border/50 shadow-xl backdrop-blur-sm">
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <ChefHat className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-2xl font-bold text-foreground mb-1">50+</div>
                                <div className="text-sm text-muted-foreground">{t('menu.recipes') || 'Recipes'}</div>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Clock className="w-8 h-8 text-secondary" />
                                </div>
                                <div className="text-2xl font-bold text-foreground mb-1">15</div>
                                <div className="text-sm text-muted-foreground">{t('menu.avg_prep_time') || 'Avg Prep Time'}</div>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <TrendingUp className="w-8 h-8 text-accent" />
                                </div>
                                <div className="text-2xl font-bold text-foreground mb-1">98%</div>
                                <div className="text-sm text-muted-foreground">{t('menu.satisfaction') || 'Satisfaction'}</div>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Utensils className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-2xl font-bold text-foreground mb-1">Daily</div>
                                <div className="text-sm text-muted-foreground">{t('menu.fresh_made') || 'Fresh Made'}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Meals Grid */}
                <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                    {filteredMeals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredMeals.map((meal, index) => (
                                <div
                                    key={meal.slug}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <MealCard meal={meal} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gradient-to-r from-muted/50 to-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ChefHat className="w-12 h-12 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                {t('menu.no_meals') || 'No meals available'}
                            </h3>
                            <p className="text-muted-foreground">
                                {activeCategory === 'weekly'
                                    ? (t('menu.no_meals_date') || 'Try selecting a different date')
                                    : (t('menu.coming_soon') || 'More options coming soon!')
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .bg-grid-pattern {
                    background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                }
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "react-i18next"
import { MealCard } from "./MealCard"
import { useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { apiRoutes } from "@/routes/api"
import { handleErrorResponse } from "@/utils"
import {
    Calendar,
    ChefHat,
    Coffee,
    Utensils,
    Wine,
    Sparkles,
    Clock,
    TrendingUp
} from "lucide-react"
import { Meal } from "@/interfaces/admin"

// Get current week's start date (Monday)
const getCurrentWeekStart = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday.toISOString().split('T')[0];
};

export function MenuPage() {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState<string>('weekly');
    const [selectedDate, setSelectedDate] = useState<string>(getCurrentWeekStart());
    const [isAnimating, setIsAnimating] = useState(false);

    // Fetch weekly menu for current week
    const { isLoading: isLoadingWeeklyMenu, data: weeklyMenuResponse } = useQuery<{ data: any[] }>({
        queryKey: ["weeklyMenus", "current-week"],
        queryFn: () =>
            http
                .get(`${apiRoutes.weeklyMenus}?is_active=1&is_published=1&week_start_date=${getCurrentWeekStart()}&type_id=1`)
                .then((res) => res.data)
                .catch((e) => {
                    handleErrorResponse(e);
                    throw e;
                }),
    });

    // Fetch all meals (for breakfasts)
    const { isLoading: isLoadingMeals, data: mealsResponse } = useQuery<{ data: Meal[] }>({
        queryKey: ["meals"],
        queryFn: () =>
            http
                .get(apiRoutes.meals)
                .then((res) => res.data)
                .catch((e) => {
                    handleErrorResponse(e);
                    throw e;
                }),
    });

    // Fetch drinks (type_id=2)
    const { isLoading: isLoadingDrinks, data: drinksResponse } = useQuery<{ data: Meal[] }>({
        queryKey: ["meals", "drinks"],
        queryFn: () =>
            http
                .get(`${apiRoutes.meals}?type_id=2`)
                .then((res) => res.data)
                .catch((e) => {
                    handleErrorResponse(e);
                    throw e;
                }),
    });

    // Fetch categories
    const { isLoading: isLoadingCategories, data: categoriesResponse } = useQuery<{ data: any[] }>({
        queryKey: ["categories"],
        queryFn: () =>
            http
                .get(apiRoutes.categories)
                .then((res) => res.data)
                .catch((e) => {
                    handleErrorResponse(e);
                    throw e;
                }),
    });

    const weeklyMenu = weeklyMenuResponse?.data?.[0] || null;
    const allMeals = mealsResponse?.data || [];
    const mainMeals = weeklyMenu?.meals || [];
    const breakfasts = allMeals.filter(meal =>
        meal.type === 'breakfast' || meal.category?.name?.toLowerCase().includes('breakfast')
    );
    const drinks = drinksResponse?.data || [];

    // Generate week dates based on menu
    const generateWeekDates = () => {
        if (!weeklyMenu) return [];
        const startDate = new Date(weeklyMenu.week_start_date);
        const dates = [];
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            dates.push({
                date: date.toISOString().split('T')[0],
                day: dayNames[date.getDay()]
            });
        }
        return dates;
    };

    const weeklyDates = generateWeekDates();
    const isLoading = isLoadingWeeklyMenu || isLoadingMeals || isLoadingDrinks || isLoadingCategories;

    // Calculate stats from meals data
    const totalRecipes = allMeals.length || 0;
    const avgPrepTime = allMeals.length > 0 
        ? Math.round(allMeals.reduce((sum, meal) => sum + ((meal.prep_time_minutes || 0) + (meal.cooking_time_minutes || 0)), 0) / allMeals.length)
        : 15;
    const satisfactionRate = 98; // Default satisfaction rate
    
    const statsItems = [
        {
            icon: <ChefHat className="w-8 h-8 text-primary" />,
            bgColor: 'from-primary/20 to-primary/10',
            value: `${totalRecipes}+`,
            label: t('menu.recipes') || 'Recipes'
        },
        {
            icon: <Clock className="w-8 h-8 text-secondary" />,
            bgColor: 'from-secondary/20 to-secondary/10',
            value: `${avgPrepTime}m`,
            label: t('menu.avg_prep_time') || 'Avg Prep Time'
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-secondary" />,
            bgColor: 'from-accent/20 to-accent/10',
            value: `${satisfactionRate}%`,
            label: t('menu.satisfaction') || 'Satisfaction'
        },
        {
            icon: <Utensils className="w-8 h-8 text-primary" />,
            bgColor: 'from-primary/20 to-secondary/10',
            value: 'Daily',
            label: t('menu.fresh_made') || 'Fresh Made'
        }
    ];

    // Map API categories to display format
    const apiCategories = categoriesResponse?.data || [];
    const categories = apiCategories.map((cat: any) => ({
        id: cat.slug || cat.id.toString(),
        name: cat.name,
        icon: cat.slug === 'weekly' ? <Calendar className="w-5 h-5" /> :
              cat.slug === 'breakfast' ? <Coffee className="w-5 h-5" /> :
              cat.slug === 'drinks' ? <Wine className="w-5 h-5" /> :
              <Utensils className="w-5 h-5" />,
        color: cat.slug === 'weekly' ? 'from-primary/20 to-primary/10' :
               cat.slug === 'breakfast' ? 'from-secondary/20 to-secondary/10' :
               cat.slug === 'drinks' ? 'from-accent/20 to-accent/10' :
               'from-muted/20 to-muted/10',
        accent: cat.slug === 'weekly' ? 'border-primary/30 text-primary' :
                cat.slug === 'breakfast' ? 'border-secondary/30 text-secondary' :
                cat.slug === 'drinks' ? 'border-accent/30 text-accent' :
                'border-muted/30 text-muted-foreground'
    })) as Array<{
        id: string;
        name: string;
        icon: React.ReactNode;
        color: string;
        accent: string;
    }>;

    const handleCategoryChange = (category: string) => {
        setIsAnimating(true);
        setTimeout(() => {
            setActiveCategory(category);
            setIsAnimating(false);
        }, 150);
    };

    // Filter meals based on category
    const filteredMeals = (() => {
        if (activeCategory === 'weekly') {
            return mainMeals;
        } else if (activeCategory === 'breakfast') {
            return breakfasts;
        } else if (activeCategory === 'drinks') {
            return drinks;
        } else {
            // For any other category from API, filter by type or slug
            return allMeals.filter(meal => 
                meal.type === activeCategory || 
                meal.category?.slug === activeCategory ||
                meal.category?.name?.toLowerCase().includes(activeCategory.toLowerCase())
            );
        }
    })();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 ">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border-b border-border/50 pt-20">
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
                {activeCategory === 'weekly' && weeklyMenu && (
                    <div className="mb-12">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-foreground mb-2">
                                {weeklyMenu.title || (t('menu.week_of') || 'Week of')} {formatDate(weeklyMenu.week_start_date)} - {formatDate(weeklyMenu.week_end_date)}
                            </h2>
                            <p className="text-muted-foreground">
                                {weeklyMenu.description || (t('menu.select_date') || 'Select a date to view available meals')}
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
                            {statsItems.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Meals Grid */}
                <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Card key={index} className="border-2 border-gray-200">
                                    <CardContent className="p-6">
                                        <div className="animate-pulse">
                                            <div className="h-48 bg-gray-200 rounded mb-4"></div>
                                            <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                                            <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : filteredMeals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredMeals.map((meal, index) => (
                                <div
                                    key={meal.id || meal.slug}
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

            <style>{`
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

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { updatePlanData } from "@/store/slices/joinProcessSlice"
import { MealCard } from "@/components/MealCard"
import { Meal, Reward } from "@/interfaces/admin"
import { useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { apiRoutes } from "@/routes/api"
import { handleErrorResponse } from "@/utils"
import {
    Calendar,
    Users,
    Utensils,
    Coffee,
    Plus,
    Minus,
    Check,
    X,
    ImageIcon
} from "lucide-react"

export function Meals() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const planData = useSelector((state: RootState) => state.joinProcess.planData)
    const admin = useSelector((state: RootState) => state.admin?.user)
    
    useEffect(() => {
            if (admin?.id) {
                FetchRewards()
            }
    }, [admin?.id])

    const [selectedMeals, setSelectedMeals] = useState<{ [key: number]: number }>(planData?.selectedMeals || {})
    const [selectedDrinks, setSelectedDrinks] = useState<{ [key: number]: number }>(planData?.selectedDrinks || {})
    const [showBreakfast, setShowBreakfast] = useState(false)
    const [showDrinks, setShowDrinks] = useState(false)

    // Get current week's start date (Monday)
    const getCurrentWeekStart = () => {
        const today = new Date();
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        const monday = new Date(today.setDate(diff));
        monday.setHours(0, 0, 0, 0);
        return monday.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    };

    // Fetch weekly menu from API for current week
    const { isLoading: isLoadingMenu, data: weeklyMenuResponse } = useQuery<{ data: any[] }>({
        queryKey: ["weeklyMenus", "current-week"],
        queryFn: () =>
            http
                .get(`${apiRoutes.weeklyMenus}?is_active=1&is_published=1&week_start_date=${getCurrentWeekStart()}&type_id=1`)
                .then((res) => {
                    return res.data;
                })
                .catch((e) => {
                    handleErrorResponse(e);
                    throw e;
                }),
    });
    console.log('weeklyMenuResponse', weeklyMenuResponse)
    // Fetch all meals from API (for breakfasts and drinks)
    const { isLoading: isLoadingMeals, data: mealsResponse } = useQuery<{ data: Meal[] }>({
        queryKey: ["meals"],
        queryFn: () =>
            http
                .get(apiRoutes.meals)
                .then((res) => {
                    return res.data;
                })
                .catch((e) => {
                    handleErrorResponse(e);
                    throw e;
                }),
    });

    // Fetch drinks from API with type_id=2 filter
    const { isLoading: isLoadingDrinks, data: drinksResponse } = useQuery<{ data: Meal[] }>({
        queryKey: ["meals", "drinks"],
        queryFn: () =>
            http
                .get(`${apiRoutes.meals}?type_id=2`)
                .then((res) => {
                    return res.data;
                })
                .catch((e) => {
                    handleErrorResponse(e);
                    throw e;
                }),
    });

    const FetchRewards = () => {
        http.get(apiRoutes.rewards)
            .then((res) => {
                return res.data.data;
            })
            .catch((error) => {
                handleErrorResponse(error);
                return [];
            });
    };

    const weeklyMenu = weeklyMenuResponse?.data?.[0] || null;
    const allMeals = mealsResponse?.data || [];

    // Get main meals from weekly menu - meals are directly in the array
    const mainMeals = weeklyMenu?.meals || [];

    // Filter breakfasts and drinks from all meals
    const breakfasts = allMeals.filter(meal =>
        meal.type === 'breakfast' || meal.category?.name?.toLowerCase().includes('breakfast')
    );

    const drinks = drinksResponse?.data || [];

    // Update local state when Redux state changes
    useEffect(() => {
        if (planData) {
            setSelectedMeals(planData.selectedMeals || {})
            setSelectedDrinks(planData.selectedDrinks || {})
        }
    }, [planData])

    // Calculate total selected meals using new structure
    const totalSelectedMeals = Object.values(selectedMeals).reduce((sum, meal) => sum + (meal.quantity || 0), 0)
    const remainingMeals = (planData?.mealsPerWeek || 10) - totalSelectedMeals

    // Update selectedMeals to store full meal object with quantity
    const handleMealQuantityChange = (mealId: number, change: number) => {
        const mealObj = mainMeals.find(m => m.id === mealId)
        if (!mealObj) return

        setSelectedMeals(prev => {
            const currentQty = prev[mealId]?.quantity || 0
            // Recalculate remainingMeals based on new structure
            const totalSelected = Object.values(prev).reduce((sum, meal) => sum + (meal.quantity || 0), 0)
            const remaining = (planData?.mealsPerWeek || 10) - totalSelected
            const newQty = Math.max(0, Math.min(currentQty + change, remaining + currentQty))

            let newSelectedMeals
            if (newQty === 0) {
                const { [mealId]: removed, ...rest } = prev
                newSelectedMeals = rest
            } else {
                newSelectedMeals = {
                    ...prev,
                    [mealId]: {
                        ...mealObj,
                        quantity: newQty
                    }
                }
            }

            dispatch(updatePlanData({ selectedMeals: newSelectedMeals }))
            return newSelectedMeals
        })
    }

    // Update selectedDrinks to store full drink object with quantity
    const handleDrinkQuantityChange = (itemId: number, change: number) => {
        const drinkObj = drinks.find(d => d.id === itemId)
        if (!drinkObj) return

        setSelectedDrinks(prev => {
            const currentQty = prev[itemId]?.quantity || 0
            const newQty = Math.max(0, currentQty + change)

            let newSelectedDrinks
            if (newQty === 0) {
                const { [itemId]: removed, ...rest } = prev
                newSelectedDrinks = rest
            } else {
                newSelectedDrinks = {
                    ...prev,
                    [itemId]: {
                        ...drinkObj,
                        quantity: newQty
                    }
                }
            }

            dispatch(updatePlanData({ selectedDrinks: newSelectedDrinks }))
            return newSelectedDrinks
        })
    }

    // Helper: get selected meal objects with quantity
    const selectedMealObjects = Object.values(selectedMeals || {})

    // Helper: get selected drink objects with quantity
    const selectedDrinkObjects = Object.values(selectedDrinks || {})

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                    {weeklyMenu?.title || t('joinNow.meals.title', 'CHOOSE YOUR MEALS')}
                </h2>
                <p className="text-muted-foreground">
                    {weeklyMenu?.description || t('joinNow.meals.subtitle', 'Menu changes weekly with 50+ options per month')}
                </p>
                {weeklyMenu && (
                    <div className="mt-3">
                        <Badge variant="outline" className="text-sm px-4 py-1">
                            <Calendar className="w-4 h-4 mr-2 inline" />
                            {new Date(weeklyMenu.week_start_date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short'
                            })} - {new Date(weeklyMenu.week_end_date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </Badge>
                    </div>
                )}
            </div>

            {/* Plan Summary */}
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Utensils className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Protein Preference</p>
                                <p className="font-semibold text-foreground">{planData?.category?.name}</p>
                            </div>

                        </div>

                        {/* <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Portion Size</p>
                                <p className="font-semibold text-foreground">{planData?.portion || 'Not selected'}</p>
                            </div>
                        </div> */}

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Badge className="w-5 h-5 bg-primary text-primary-foreground">{planData?.mealsPerWeek || 0}</Badge>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Main Meals</p>
                                <p className="font-semibold text-foreground">{totalSelectedMeals}/{planData?.mealsPerWeek || 0}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Delivery Date</p>
                                <p className="font-semibold text-foreground">
                                    {weeklyMenu ?
                                        `${new Date(weeklyMenu.week_start_date).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short'
                                        })} - ${new Date(weeklyMenu.week_end_date).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short'
                                        })}`
                                        : t('joinNow.meals.deliveryWeek', 'During the week')
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Remaining Meals Counter */}
            {remainingMeals > 0 && (
                <div className="text-center">
                    <Badge variant="outline" className="text-lg px-4 py-2 border-primary text-primary">
                        {remainingMeals} meals remaining to select
                    </Badge>
                </div>
            )}

            {/* Main Meals Grid */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Weekly Menu</h3>
                {isLoadingMenu ? (
                    // Loading skeleton
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Card key={index} className="border-2 border-gray-200">
                                <CardContent className="p-6">
                                    <div className="animate-pulse">
                                        <div className="h-40 bg-gray-200 rounded mb-4"></div>
                                        <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : mainMeals.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No meals available for this week. Please check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mainMeals.map((meal) => (
                            <div key={meal.id} className="relative">
                                <MealCard meal={meal} />

                                {/* Quantity Selector Overlay */}
                                <div className="absolute top-4 left-4 bg-white dark:bg-card rounded-lg shadow-lg border border-border p-2 flex items-center space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                        onClick={() => handleMealQuantityChange(meal.id, -1)}
                                        disabled={!selectedMeals[meal.id]}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>

                                    <span className="min-w-[2rem] text-center font-semibold">
                                        {selectedMeals[meal.id]?.quantity || 0}
                                    </span>

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                        onClick={() => handleMealQuantityChange(meal.id, 1)}
                                        disabled={remainingMeals === 0}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Breakfast Section */}
            {/* <Card className="border-2 border-dashed border-muted-foreground/30">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Coffee className="w-6 h-6 text-primary" />
                        <div>
                            <CardTitle className="text-lg">Add Breakfast Options</CardTitle>
                            <p className="text-sm text-muted-foreground">Optional - Start your day right</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            variant={showBreakfast ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowBreakfast(true)}
                            className="flex items-center space-x-1"
                        >
                            <Check className="w-4 h-4" />
                            <span>Add</span>
                        </Button>
                        <Button
                            variant={!showBreakfast ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowBreakfast(false)}
                            className="flex items-center space-x-1"
                        >
                            <X className="w-4 h-4" />
                            <span>Skip</span>
                        </Button>
                    </div>
                </CardHeader>

                {showBreakfast && (
                    <CardContent>
                        {isLoadingMeals ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <Card key={index} className="border-2 border-gray-200">
                                        <CardContent className="p-4">
                                            <div className="animate-pulse">
                                                <div className="h-32 bg-gray-200 rounded mb-3"></div>
                                                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : breakfasts.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">No breakfast options available at the moment.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {breakfasts.map((breakfast) => (
                                    <Card key={breakfast.id} className="relative hover:shadow-lg transition-shadow">
                                        <div className="relative h-32 overflow-hidden rounded-t-lg">
                                            <img
                                                src={breakfast.image_url || breakfast.image_path || "/api/placeholder/300/200"}
                                                alt={breakfast.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <Badge className="bg-primary text-primary-foreground">
                                                    £{Number(breakfast.price).toFixed(2)}
                                                </Badge>
                                            </div>
                                        </div>

                                        <CardContent className="p-4">
                                            <h4 className="font-semibold mb-1">{breakfast.name}</h4>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                {breakfast.short_description || breakfast.description}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="text-xs text-muted-foreground">
                                                    {breakfast.calories || 0} kcal • {breakfast.protein || 0}g protein
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-6 w-6 p-0"
                                                        onClick={() => handleBreakfastQuantityChange(breakfast.id, -1)}
                                                        disabled={!selectedBreakfasts[breakfast.id]}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>

                                                    <span className="min-w-[1.5rem] text-center text-sm font-semibold">
                                                        {selectedBreakfasts[breakfast.id] || 0}
                                                    </span>

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-6 w-6 p-0"
                                                        onClick={() => handleBreakfastQuantityChange(breakfast.id, 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                )}
            </Card> */}

            {/* Drinks Section */}
            <Card className="border-2 border-dashed border-muted-foreground/30">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Coffee className="w-6 h-6 text-secondary" />
                        <div>
                            <CardTitle className="text-lg">Add Drinks</CardTitle>
                            <p className="text-sm text-muted-foreground">Optional - Healthy beverages</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            variant={showDrinks ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowDrinks(true)}
                            className="flex items-center space-x-1"
                        >
                            <Check className="w-4 h-4" />
                            <span>Add</span>
                        </Button>
                        <Button
                            variant={!showDrinks ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowDrinks(false)}
                            className="flex items-center space-x-1"
                        >
                            <X className="w-4 h-4" />
                            <span>Skip</span>
                        </Button>
                    </div>
                </CardHeader>

                {showDrinks && (
                    <CardContent>
                        {isLoadingDrinks ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <Card key={index} className="border-2 border-gray-200">
                                        <CardContent className="p-4">
                                            <div className="animate-pulse">
                                                <div className="h-32 bg-gray-200 rounded mb-3"></div>
                                                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : drinks.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">No drinks available at the moment.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {drinks.map((drink) => (
                                    <Card key={drink.id} className="relative hover:shadow-lg transition-shadow">
                                        <div className="relative h-32 overflow-hidden rounded-t-lg">
                                            {drink.image_url || drink.image_path ? (
                                                <img
                                                    src={drink.image_url || drink.image_path}
                                                    alt={drink.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <ImageIcon className="w-8 h-8 text-gray-400" />
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2">
                                                <Badge className="bg-secondary text-secondary-foreground">
                                                    £{Number(drink.price).toFixed(2)}
                                                </Badge>
                                            </div>
                                        </div>

                                        <CardContent className="p-4">
                                            <h4 className="font-semibold mb-1">{drink.name}</h4>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                {drink.short_description || drink.description}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="text-xs text-muted-foreground">
                                                    {drink.calories || 0} kcal • {drink.protein || 0}g protein
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-6 w-6 p-0"
                                                        onClick={() => handleDrinkQuantityChange(drink.id, -1)}
                                                        disabled={!selectedDrinks[drink.id]}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>

                                                    <span className="min-w-[1.5rem] text-center text-sm font-semibold">
                                                        {selectedDrinks[drink.id]?.quantity || 0}
                                                    </span>

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-6 w-6 p-0"
                                                        onClick={() => handleDrinkQuantityChange(drink.id, 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                )}
            </Card>

            {/* Selected Meals Summary */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-lg">Selected Meals & Drinks Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <h4 className="font-semibold mb-2">Meals</h4>
                        {selectedMealObjects.length === 0 ? (
                            <div className="text-muted-foreground">No meals selected.</div>
                        ) : (
                            <ul className="space-y-2">
                                {selectedMealObjects.map(meal => (
                                    <li key={meal.id} className="flex items-center gap-4">
                                        {meal.image_url || meal.image_path ? (
                                            <img
                                                src={meal.image_url || meal.image_path}
                                                alt={meal.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
                                                <ImageIcon className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <span className="font-semibold">{meal.name}</span>
                                            <span className="ml-2 text-sm text-muted-foreground">x {meal.quantity}</span>
                                            <div className="text-xs text-muted-foreground">
                                                Protein: {meal.protein}g | Calories: {meal.calories}
                                            </div>
                                            {/* Remove direct object rendering */}
                                            {/* For debug only: */}
                                            {/* <pre className="bg-muted/10 rounded p-1">{JSON.stringify(meal, null, 2)}</pre> */}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="mt-6">
                        <h4 className="font-semibold mb-2">Drinks</h4>
                        {selectedDrinkObjects.length === 0 ? (
                            <div className="text-muted-foreground">No drinks selected.</div>
                        ) : (
                            <ul className="space-y-2">
                                {selectedDrinkObjects.map(drink => (
                                    <li key={drink.id} className="flex items-center gap-4">
                                        {drink.image_url || drink.image_path ? (
                                            <img
                                                src={drink.image_url || drink.image_path}
                                                alt={drink.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
                                                <ImageIcon className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <span className="font-semibold">{drink.name}</span>
                                            <span className="ml-2 text-sm text-muted-foreground">x {drink.quantity}</span>
                                            <div className="text-xs text-muted-foreground">
                                                Protein: {drink.protein}g | Calories: {drink.calories}
                                            </div>
                                            {/* Remove direct object rendering */}
                                            {/* For debug only: */}
                                            {/* <pre className="bg-muted/10 rounded p-1">{JSON.stringify(drink, null, 2)}</pre> */}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

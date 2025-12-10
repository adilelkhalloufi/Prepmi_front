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
    ImageIcon,
    Gift
} from "lucide-react"

export function Meals() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const planData = useSelector((state: RootState) => state.joinProcess.planData)
    const admin = useSelector((state: RootState) => state.admin?.user)

    const [selectedMeals, setSelectedMeals] = useState<{ [key: number]: number }>(planData?.selectedMeals || {})
    const [selectedDrinks, setSelectedDrinks] = useState<{ [key: number]: number }>(planData?.selectedDrinks || {})
    const [selectedFreeDrinks, setSelectedFreeDrinks] = useState<{ [key: number]: number }>(planData?.selectedFreeDrinks || {})
    const [showBreakfast, setShowBreakfast] = useState(false)
    const [showDrinks, setShowDrinks] = useState(false)
    const [showRewards, setShowRewards] = useState(false)
    const [appliedReward, setAppliedReward] = useState<Reward | null>(null)
    const [appliedRewardMeal, setAppliedRewardMeal] = useState<Meal | null>(null)

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

    // Fetch rewards for current user
    const { isLoading: isLoadingRewards, data: rewardsResponse } = useQuery<any>({
        queryKey: ["rewards", admin?.id],
        queryFn: () =>
            http.get(apiRoutes.rewards)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    handleErrorResponse(error);
                    throw error;
                }),
        enabled: !!admin?.id,
    });

    // Fetch user's active membership if logged in
    const { data: membershipResponse } = useQuery({
        queryKey: ["user-membership", admin?.id],
        queryFn: () =>
            http
                .get(`${apiRoutes.memberships}?user_id=${admin?.id}&status=active`)
                .then((res) => {
                    const memberships = res.data.data ?? res.data
                    return Array.isArray(memberships) ? memberships[0] : null
                })
                .catch(() => null),
        enabled: !!admin?.id,
    });



    const weeklyMenu = weeklyMenuResponse?.data?.[0] || null;
    const allMeals = mealsResponse?.data || [];
    const mainMeals = weeklyMenu?.meals || [];
    const breakfasts = allMeals.filter(meal =>
        meal.type === 'breakfast' || meal.category?.name?.toLowerCase().includes('breakfast')
    );
    const drinks = drinksResponse?.data || [];
    
    // Membership data
    const userMembership = membershipResponse || null;
    const membershipPlan = userMembership?.membership_plan || null;
    const hasFreeDesserts = membershipPlan?.includes_free_desserts || false;
    const freeDessertsQuantity = Number(membershipPlan?.free_desserts_quantity || 0);
    const membershipDiscount = Number(membershipPlan?.discount_percentage || 0);

    // Get unused free_meal rewards - handle array of rewards
    const availableRewards = (() => {
        const rewardData = rewardsResponse;

        if (!rewardData) return [];

        // Handle array of rewards
        if (Array.isArray(rewardData)) {
            return rewardData.filter(
                reward => reward.type === 'free_meal' && !reward.is_used
            );
        }

        // Handle single reward object (fallback)
        if (rewardData.type === 'free_meal' && !rewardData.is_used) {
            return [rewardData];
        }

        return [];
    })();
    console.log('Available Rewards:', availableRewards);
    // Filter meals that are eligible for reward (based on value)
    const getRewardEligibleMeals = (reward: Reward) => {
        const rewardValue = Number(reward.value);
        return mainMeals.filter(meal => {
            const mealPrice = Number(meal.price || 0);
            return mealPrice <= rewardValue;
        });
    };

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

    // Handle free drinks from membership
    const handleFreeDrinkQuantityChange = (itemId: number, change: number) => {
        const drinkObj = drinks.find(d => d.id === itemId)
        if (!drinkObj) return

        setSelectedFreeDrinks(prev => {
            const currentQty = prev[itemId]?.quantity || 0
            const totalFreeDrinks = Object.values(prev).reduce((sum, drink) => sum + (drink.quantity || 0), 0)
            const remainingFreeDrinks = freeDessertsQuantity - totalFreeDrinks
            const newQty = Math.max(0, Math.min(currentQty + change, remainingFreeDrinks + currentQty))

            let newSelectedFreeDrinks
            if (newQty === 0) {
                const { [itemId]: removed, ...rest } = prev
                newSelectedFreeDrinks = rest
            } else {
                newSelectedFreeDrinks = {
                    ...prev,
                    [itemId]: {
                        ...drinkObj,
                        quantity: newQty
                    }
                }
            }

            dispatch(updatePlanData({ selectedFreeDrinks: newSelectedFreeDrinks }))
            return newSelectedFreeDrinks
        })
    }

    // Helper: get selected meal objects with quantity
    const selectedMealObjects = Object.values(selectedMeals || {})

    // Helper: get selected drink objects with quantity
    const selectedDrinkObjects = Object.values(selectedDrinks || {})

    const handleApplyReward = (mealId: number, rewardId: number) => {
        const reward = availableRewards.find(r => r.id === rewardId);
        const selectedMeal = mainMeals.find(m => m.id === mealId);
        if (!reward || !selectedMeal) return;

        setAppliedReward(reward);
        setAppliedRewardMeal(selectedMeal);
        dispatch(updatePlanData({
            selectedRewardsMeals: {
                rewardId: reward.id,
                mealId: mealId,
                mealName: selectedMeal.name,
                mealPrice: selectedMeal.price,
                mealImage: selectedMeal.image_url || selectedMeal.image_path,
                mealCalories: selectedMeal.calories,
                mealProtein: selectedMeal.protein,
                mealDescription: selectedMeal.short_description || selectedMeal.description
            },

        }));
        setShowRewards(false);
    };

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
                    <div className="flex flex-col md:flex-row md:justify-between md:space-x-6 space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Utensils className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Protein Preference</p>
                                <p className="font-semibold text-foreground">{planData?.category?.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Badge className="w-5 h-5 bg-primary text-primary-foreground">{planData?.mealsPerWeek || 0}</Badge>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Main Meals</p>
                                <p className="font-semibold text-foreground">{totalSelectedMeals}/{planData?.mealsPerWeek || 0}</p>
                            </div>
                        </div>

                        {/* Membership Section */}
                        {userMembership && membershipPlan && (
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Membership</p>
                                    <p className="font-semibold text-foreground">{membershipPlan.name}</p>
                                    {membershipDiscount > 0 && (
                                        <p className="text-xs text-green-600">{membershipDiscount}% discount</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Free Desserts/Drinks */}
                        {hasFreeDesserts && freeDessertsQuantity > 0 && (
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                                    <Gift className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Free Drinks/Month</p>
                                    <p className="font-semibold text-foreground">
                                        {Object.values(selectedFreeDrinks).reduce((sum, drink) => sum + (drink.quantity || 0), 0)}/{freeDessertsQuantity}
                                    </p>
                                </div>
                            </div>
                        )}

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

                        {availableRewards.length > 0 && (
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                                    <Gift className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Available Rewards</p>
                                    <p className="font-semibold text-foreground">
                                        {availableRewards.map(r => `${Number(r.value).toFixed(2)} MAD`).join(', ')}
                                    </p>
                                </div>
                            </div>
                        )}
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

            {/* Rewards Section */}
            {availableRewards.length > 0 && (
                <Card className="border-2 border-dashed border-secondary/30 bg-secondary/5">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Gift className="w-6 h-6 text-secondary" />
                            <div>
                                <CardTitle className="text-lg">Available Rewards</CardTitle>
                                <p className="text-sm text-muted-foreground">You have {availableRewards.length} free meal reward(s)</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                variant={showRewards ? "default" : "outline"}
                                size="sm"
                                onClick={() => setShowRewards(true)}
                                className="flex items-center space-x-1"
                            >
                                <Check className="w-4 h-4" />
                                <span>View</span>
                            </Button>
                            <Button
                                variant={!showRewards ? "default" : "outline"}
                                size="sm"
                                onClick={() => setShowRewards(false)}
                                className="flex items-center space-x-1"
                            >
                                <X className="w-4 h-4" />
                                <span>Hide</span>
                            </Button>
                        </div>
                    </CardHeader>

                    {showRewards && (
                        <CardContent className="space-y-6">
                            {availableRewards.map((reward) => {
                                const eligibleMeals = getRewardEligibleMeals(reward);
                                const isApplied = appliedReward?.id === reward.id;

                                return (
                                    <div key={reward.id} className="border rounded-lg p-4 bg-card">
                                        <div className="mb-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h4 className="font-semibold text-lg">{reward.title}</h4>
                                                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                                                </div>
                                                <Badge className="bg-secondary text-secondary-foreground whitespace-nowrap">
                                                    £{Number(reward.value).toFixed(2)}
                                                </Badge>
                                            </div>
                                            {isApplied && (
                                                <Badge className="bg-green-500 text-white">
                                                    <Check className="w-3 h-3 mr-1" />
                                                    Applied
                                                </Badge>
                                            )}
                                        </div>

                                        <p className="text-sm font-medium mb-3 text-foreground">
                                            Select a meal to apply this reward ({eligibleMeals.length} eligible meals):
                                        </p>

                                        {eligibleMeals.length === 0 ? (
                                            <div className="text-center py-6">
                                                <p className="text-muted-foreground">No meals available for this reward value.</p>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {eligibleMeals.map((meal) => (
                                                    <Card
                                                        key={meal.id}
                                                        className={`relative hover:shadow-lg transition-all ${isApplied && appliedReward?.meal_id === meal.id
                                                            ? 'ring-2 ring-secondary'
                                                            : ''
                                                            }`}
                                                    >
                                                        <div className="relative h-32 overflow-hidden rounded-t-lg">
                                                            {meal.image_url || meal.image_path ? (
                                                                <img
                                                                    src={meal.image_url || meal.image_path}
                                                                    alt={meal.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                                    <ImageIcon className="w-8 h-8 text-gray-400" />
                                                                </div>
                                                            )}
                                                            <div className="absolute top-2 right-2">
                                                                <Badge className="bg-primary text-primary-foreground">
                                                                    {Number(meal.price).toFixed(2)} MAD
                                                                </Badge>
                                                            </div>
                                                        </div>

                                                        <CardContent className="p-4">
                                                            <h4 className="font-semibold mb-1 text-sm">{meal.name}</h4>
                                                            <p className="text-xs text-muted-foreground mb-3">
                                                                {meal.short_description || meal.description}
                                                            </p>

                                                            <div className="flex items-center justify-between mb-3">
                                                                <div className="text-xs text-muted-foreground">
                                                                    {meal.calories || 0} kcal • {meal.protein || 0}g protein
                                                                </div>
                                                            </div>

                                                            <Button
                                                                size="sm"
                                                                variant={isApplied && appliedReward?.meal_id === meal.id ? "default" : "outline"}
                                                                className="w-full"
                                                                onClick={() => handleApplyReward(meal.id, reward.id)}
                                                            >
                                                                {isApplied && appliedReward?.meal_id === meal.id ? (
                                                                    <>
                                                                        <Check className="w-3 h-3 mr-1" />
                                                                        Applied
                                                                    </>
                                                                ) : (
                                                                    'Apply Reward'
                                                                )}
                                                            </Button>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </CardContent>
                    )}
                </Card>
            )}

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

            {/* Free Drinks Section (Membership Benefit) */}
            {hasFreeDesserts && freeDessertsQuantity > 0 && (
                <Card className="border-2 border-green-200 bg-green-50">
                    <CardHeader>
                        <div className="flex items-center space-x-3">
                            <Gift className="w-6 h-6 text-green-600" />
                            <div>
                                <CardTitle className="text-lg text-green-800">Free Drinks (Membership Benefit)</CardTitle>
                                <p className="text-sm text-green-600">
                                    Select up to {freeDessertsQuantity} free drinks included in your {membershipPlan?.name} membership
                                </p>
                            </div>
                        </div>
                    </CardHeader>
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
                            <>
                                <div className="mb-4 text-center">
                                    <Badge variant="outline" className="text-green-600 border-green-300">
                                        {Object.values(selectedFreeDrinks).reduce((sum, drink) => sum + (drink.quantity || 0), 0)} / {freeDessertsQuantity} selected
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {drinks.map((drink) => {
                                        const remainingFreeDrinks = freeDessertsQuantity - Object.values(selectedFreeDrinks).reduce((sum, d) => sum + (d.quantity || 0), 0)
                                        const canAddMore = remainingFreeDrinks > 0 || selectedFreeDrinks[drink.id]?.quantity > 0
                                        
                                        return (
                                            <Card key={drink.id} className={`relative transition-shadow ${
                                                selectedFreeDrinks[drink.id]?.quantity > 0 ? 'ring-2 ring-green-400 bg-green-50' : 'hover:shadow-lg'
                                            }`}>
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
                                                        <Badge className="bg-green-600 text-white">
                                                            FREE
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
                                                                className="h-6 w-6 p-0 border-green-400 text-green-600 hover:bg-green-50"
                                                                onClick={() => handleFreeDrinkQuantityChange(drink.id, -1)}
                                                                disabled={!selectedFreeDrinks[drink.id]}
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </Button>

                                                            <span className="min-w-[1.5rem] text-center text-sm font-semibold text-green-700">
                                                                {selectedFreeDrinks[drink.id]?.quantity || 0}
                                                            </span>

                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="h-6 w-6 p-0 border-green-400 text-green-600 hover:bg-green-50"
                                                                onClick={() => handleFreeDrinkQuantityChange(drink.id, 1)}
                                                                disabled={!canAddMore}
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}

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
                    {/* Applied Reward Section */}
                    {appliedReward && appliedRewardMeal && (
                        <div className="mb-6 p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Gift className="w-5 h-5 text-secondary" />
                                    <h4 className="font-semibold text-foreground">Applied Reward</h4>
                                </div>
                                <Badge className="bg-secondary text-white">
                                    {Number(appliedReward.value).toFixed(2)} MAD
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{appliedReward.title}</p>
                            <p className="text-xs text-muted-foreground mb-3">{appliedReward.description}</p>

                            {/* Reward Meal Display */}
                            <div className="mt-3 p-3 bg-white dark:bg-card rounded border border-secondary/20 flex items-center gap-3">
                                {appliedRewardMeal.image_url || appliedRewardMeal.image_path ? (
                                    <img
                                        src={appliedRewardMeal.image_url || appliedRewardMeal.image_path}
                                        alt={appliedRewardMeal.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
                                        <ImageIcon className="w-8 h-8 text-gray-400" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <p className="font-semibold text-foreground">{appliedRewardMeal.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {appliedRewardMeal.calories || 0} kcal • {appliedRewardMeal.protein || 0}g protein
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Price: {Number(appliedRewardMeal.price).toFixed(2)} MAD
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

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
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    {/* Free Drinks Summary */}
                    {hasFreeDesserts && Object.keys(selectedFreeDrinks).length > 0 && (
                        <div className="mt-6">
                            <h4 className="font-semibold mb-2 text-green-700">Free Drinks (Membership)</h4>
                            <ul className="space-y-2">
                                {Object.values(selectedFreeDrinks).map(drink => (
                                    <li key={drink.id} className="flex items-center gap-4 bg-green-50 p-2 rounded">
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
                                            <span className="font-semibold text-green-800">{drink.name}</span>
                                            <span className="ml-2 text-sm text-green-600">x {drink.quantity}</span>
                                            <Badge className="ml-2 bg-green-600 text-white text-xs">FREE</Badge>
                                            <div className="text-xs text-green-600">
                                                Protein: {drink.protein}g | Calories: {drink.calories}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

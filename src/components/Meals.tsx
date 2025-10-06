import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { updatePlanData } from "@/store/slices/joinProcessSlice"
import { MealCard } from "@/components/MealCard"
import { Meal } from "@/interfaces/admin"
import {
    Calendar,
    Users,
    Utensils,
    Coffee,
    Plus,
    Minus,
    Check,
    X
} from "lucide-react"

// Mock data - replace with actual API call
const mockMeals: Meal[] = [
    {
        id: 1,
        name: "Grilled Chicken Teriyaki",
        short_description: "Tender grilled chicken with teriyaki glaze and steamed vegetables",
        image_path: "/api/placeholder/300/200",
        price: 12.99,
        calories: 450,
        protein: 35,
        difficulty_level: "Easy",
        prep_time_minutes: 15,
        cooking_time_minutes: 20,
        is_vegan: false,
        is_vegetarian: false,
        is_gluten_free: true,
        is_high_protein: true,
        is_keto: false,
        is_spicy: false,
        spice_level: 0
    },
    // Add more mock meals...
]

const mockBreakfasts = [
    {
        id: 101,
        name: "Overnight Oats Bowl",
        short_description: "Creamy oats with fresh berries and honey",
        image_path: "/api/placeholder/300/200",
        price: 6.99,
        calories: 320,
        protein: 12
    }
]

const mockDrinks = [
    {
        id: 201,
        name: "Fresh Green Smoothie",
        short_description: "Spinach, apple, and ginger blend",
        image_path: "/api/placeholder/300/200",
        price: 4.99,
        calories: 180,
        protein: 5
    }
]

export function Meals() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const planData = useSelector((state: RootState) => state.joinProcess.planData)

    const [selectedMeals, setSelectedMeals] = useState<{ [key: number]: number }>(planData?.selectedMeals || {})
    const [selectedBreakfasts, setSelectedBreakfasts] = useState<{ [key: number]: number }>(planData?.selectedBreakfasts || {})
    const [selectedDrinks, setSelectedDrinks] = useState<{ [key: number]: number }>(planData?.selectedDrinks || {})
    const [showBreakfast, setShowBreakfast] = useState(false)
    const [showDrinks, setShowDrinks] = useState(false)

    // Update local state when Redux state changes
    useEffect(() => {
        if (planData) {
            setSelectedMeals(planData.selectedMeals || {})
            setSelectedBreakfasts(planData.selectedBreakfasts || {})
            setSelectedDrinks(planData.selectedDrinks || {})
        }
    }, [planData])

    const totalSelectedMeals = Object.values(selectedMeals).reduce((sum, qty) => sum + qty, 0)
    const remainingMeals = (planData?.mealsPerWeek || 10) - totalSelectedMeals

    const handleMealQuantityChange = (mealId: number, change: number) => {
        setSelectedMeals(prev => {
            const currentQty = prev[mealId] || 0
            const newQty = Math.max(0, Math.min(currentQty + change, remainingMeals + currentQty))

            let newSelectedMeals
            if (newQty === 0) {
                const { [mealId]: removed, ...rest } = prev
                newSelectedMeals = rest
            } else {
                newSelectedMeals = { ...prev, [mealId]: newQty }
            }

            dispatch(updatePlanData({ selectedMeals: newSelectedMeals }))
            return newSelectedMeals
        })
    }

    const handleBreakfastQuantityChange = (itemId: number, change: number) => {
        setSelectedBreakfasts(prev => {
            const currentQty = prev[itemId] || 0
            const newQty = Math.max(0, currentQty + change)

            let newSelectedBreakfasts
            if (newQty === 0) {
                const { [itemId]: removed, ...rest } = prev
                newSelectedBreakfasts = rest
            } else {
                newSelectedBreakfasts = { ...prev, [itemId]: newQty }
            }

            dispatch(updatePlanData({ selectedBreakfasts: newSelectedBreakfasts }))
            return newSelectedBreakfasts
        })
    }

    const handleDrinkQuantityChange = (itemId: number, change: number) => {
        setSelectedDrinks(prev => {
            const currentQty = prev[itemId] || 0
            const newQty = Math.max(0, currentQty + change)

            let newSelectedDrinks
            if (newQty === 0) {
                const { [itemId]: removed, ...rest } = prev
                newSelectedDrinks = rest
            } else {
                newSelectedDrinks = { ...prev, [itemId]: newQty }
            }

            dispatch(updatePlanData({ selectedDrinks: newSelectedDrinks }))
            return newSelectedDrinks
        })
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                    {t('joinNow.meals.title', 'CHOOSE YOUR MEALS')}
                </h2>
                <p className="text-muted-foreground">
                    {t('joinNow.meals.subtitle', 'Menu changes weekly with 50+ options per month')}
                </p>
            </div>

            {/* Plan Summary */}
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Utensils className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Protein Preference</p>
                                <p className="font-semibold text-foreground">{planData?.protein || 'Not selected'}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Portion Size</p>
                                <p className="font-semibold text-foreground">{planData?.portion || 'Not selected'}</p>
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

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Delivery Date</p>
                                <p className="font-semibold text-foreground">Sunday, 12th October</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockMeals.map((meal) => (
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
                                    {selectedMeals[meal.id] || 0}
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
            </div>

            {/* Breakfast Section */}
            <Card className="border-2 border-dashed border-muted-foreground/30">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mockBreakfasts.map((breakfast) => (
                                <Card key={breakfast.id} className="relative hover:shadow-lg transition-shadow">
                                    <div className="relative h-32 overflow-hidden rounded-t-lg">
                                        <img
                                            src={breakfast.image_path}
                                            alt={breakfast.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <Badge className="bg-primary text-primary-foreground">
                                                ${breakfast.price}
                                            </Badge>
                                        </div>
                                    </div>

                                    <CardContent className="p-4">
                                        <h4 className="font-semibold mb-1">{breakfast.name}</h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {breakfast.short_description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="text-xs text-muted-foreground">
                                                {breakfast.calories} kcal • {breakfast.protein}g protein
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
                    </CardContent>
                )}
            </Card>

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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mockDrinks.map((drink) => (
                                <Card key={drink.id} className="relative hover:shadow-lg transition-shadow">
                                    <div className="relative h-32 overflow-hidden rounded-t-lg">
                                        <img
                                            src={drink.image_path}
                                            alt={drink.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <Badge className="bg-secondary text-secondary-foreground">
                                                ${drink.price}
                                            </Badge>
                                        </div>
                                    </div>

                                    <CardContent className="p-4">
                                        <h4 className="font-semibold mb-1">{drink.name}</h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {drink.short_description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="text-xs text-muted-foreground">
                                                {drink.calories} kcal • {drink.protein}g protein
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
                                                    {selectedDrinks[drink.id] || 0}
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
                    </CardContent>
                )}
            </Card>
        </div>
    )
}

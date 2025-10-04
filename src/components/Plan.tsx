import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PlanProps {
    data: {
        protein: string
        portion: string
        mealsPerWeek: number
    }
    onUpdate: (data: any) => void
}

export const Plan = ({ data, onUpdate }: PlanProps) => {
    const [selectedProtein, setSelectedProtein] = useState(data.protein)
    const [selectedPortion, setSelectedPortion] = useState(data.portion)
    const [selectedMeals, setSelectedMeals] = useState(data.mealsPerWeek)

    const proteinOptions = [
        { id: 'meat-vegan', label: 'Meat & Vegan', description: 'All meal options available' },
        { id: 'meat-only', label: 'Meat Only', description: 'Meat-based meals only' },
        { id: 'vegan-only', label: 'Vegan Only', description: 'Plant-based meals only' }
    ]

    const portionOptions = [
        {
            id: 'standard',
            label: 'Standard',
            calories: '500-600kcal',
            protein: '30-40g protein',
            price: 0
        },
        {
            id: 'large',
            label: 'Large',
            calories: '700-900kcal',
            protein: '50-65g protein',
            price: 1.99
        },
        {
            id: 'lean',
            label: 'Lean',
            calories: '500-600kcal',
            protein: '50-60g protein',
            price: 1.99
        }
    ]

    const mealOptions = [
        { count: 6, originalPrice: 7.96, discountPrice: 6.05 },
        { count: 8, originalPrice: 7.89, discountPrice: 6.00 },
        { count: 10, originalPrice: 7.49, discountPrice: 5.69 },
        { count: 12, originalPrice: 7.49, discountPrice: 5.69 },
        { count: 15, originalPrice: 7.49, discountPrice: 5.69 },
        { count: 18, originalPrice: 7.49, discountPrice: 5.69 }
    ]

    const handleProteinSelect = (protein: string) => {
        setSelectedProtein(protein)
        onUpdate({ ...data, protein })
    }

    const handlePortionSelect = (portion: string) => {
        setSelectedPortion(portion)
        onUpdate({ ...data, portion })
    }

    const handleMealSelect = (meals: number) => {
        setSelectedMeals(meals)
        onUpdate({ ...data, mealsPerWeek: meals })
    }

    const calculateTotal = () => {
        const selectedMealOption = mealOptions.find(option => option.count === selectedMeals)
        const portionExtra = selectedPortion && selectedPortion !== 'standard' ? 1.99 * selectedMeals : 0
        const subtotal = (selectedMealOption?.discountPrice || 0) * selectedMeals + portionExtra
        const discount = ((selectedMealOption?.originalPrice || 0) - (selectedMealOption?.discountPrice || 0)) * selectedMeals
        const delivery = 6.99

        return { subtotal, discount, delivery, total: subtotal }
    }

    const totals = calculateTotal()

    return (
        <div className="min-h-screen   py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Build Your Perfect
                        <span className="text-primary"> Meal Plan</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Customize your weekly meal delivery with fresh, healthy options tailored to your preferences
                    </p>
                </div>

                <div className="space-y-16">
                    {/* Protein Preference */}
                    <div className="space-y-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-xl mb-4">
                                1
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Choose Your Protein Preference
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Your preferences will help us show you the most relevant meals first. You will still be able to view all meals.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {proteinOptions.map((option) => (
                                <Card
                                    key={option.id}
                                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${selectedProtein === option.id
                                        ? 'border-primary bg-primary/10 shadow-lg'
                                        : 'border-gray-200 hover:border-primary/30'
                                        }`}
                                    onClick={() => handleProteinSelect(option.id)}
                                >
                                    <CardContent className="p-8 text-center">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{option.label}</h3>
                                        <p className="text-gray-600">{option.description}</p>
                                        {selectedProtein === option.id && (
                                            <div className="mt-4">
                                                <Badge className="bg-primary text-primary-foreground">Selected</Badge>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Portion Preference */}
                    <div className="space-y-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-xl mb-4">
                                2
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Choose Your Portion Preference
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {portionOptions.map((option) => (
                                <Card
                                    key={option.id}
                                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 relative ${selectedPortion === option.id
                                        ? 'border-primary bg-primary/10 shadow-lg'
                                        : 'border-gray-200 hover:border-primary/30'
                                        }`}
                                    onClick={() => handlePortionSelect(option.id)}
                                >
                                    {option.price > 0 && (
                                        <Badge className="absolute -top-3 -right-3 bg-secondary text-secondary-foreground">
                                            +£{option.price}/meal
                                        </Badge>
                                    )}
                                    <CardContent className="p-8 text-center">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{option.label}</h3>
                                        <p className="text-gray-600 mb-2">{option.calories}</p>
                                        <p className="text-gray-600 font-medium">{option.protein}</p>
                                        {selectedPortion === option.id && (
                                            <div className="mt-4">
                                                <Badge className="bg-primary text-primary-foreground">Selected</Badge>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Meals Per Week */}
                    <div className="space-y-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-xl mb-4">
                                3
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Select Meals Per Week
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                This number doesn't include breakfasts or snacks, you can add those later.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                            {mealOptions.map((option) => (
                                <Card
                                    key={option.count}
                                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${selectedMeals === option.count
                                        ? 'border-primary bg-primary/10 shadow-lg'
                                        : 'border-gray-200 hover:border-primary/30'
                                        }`}
                                    onClick={() => handleMealSelect(option.count)}
                                >
                                    <CardContent className="p-6 text-center">
                                        <div className="text-3xl font-bold text-gray-900 mb-2">{option.count}</div>
                                        <div className="text-sm line-through text-gray-500 mb-1">
                                            (£{option.originalPrice.toFixed(2)})
                                        </div>
                                        <div className="text-lg font-bold text-primary">
                                            £{option.discountPrice.toFixed(2)}/meal
                                        </div>
                                        {selectedMeals === option.count && (
                                            <div className="mt-3">
                                                <Badge className="bg-primary text-primary-foreground">Selected</Badge>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <Card className="bg-white border-2 border-gray-100 shadow-xl max-w-2xl mx-auto">
                            <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                                <CardTitle className="text-2xl font-bold text-center">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="font-semibold text-gray-700">Price Per Meal:</span>
                                        <div className="text-right">
                                            <span className="line-through text-gray-500 mr-3 text-sm">
                                                £{mealOptions.find(o => o.count === selectedMeals)?.originalPrice.toFixed(2) || '0.00'}
                                            </span>
                                            <span className="font-bold text-xl text-primary">
                                                £{mealOptions.find(o => o.count === selectedMeals)?.discountPrice.toFixed(2) || '0.00'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-700">Main Meals ({selectedMeals})</span>
                                        <div className="text-right">
                                            <span className="line-through text-gray-500 mr-3 text-sm">
                                                £{((mealOptions.find(o => o.count === selectedMeals)?.originalPrice || 0) * selectedMeals).toFixed(2)}
                                            </span>
                                            <span className="font-semibold text-lg">
                                                £{totals.subtotal.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-green-600 font-medium">Discount</span>
                                        <span className="font-semibold text-green-600">-£{totals.discount.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-700">Delivery (Free On 1st Order)</span>
                                        <div className="text-right">
                                            <span className="line-through text-gray-500 mr-3 text-sm">£{totals.delivery.toFixed(2)}</span>
                                            <span className="font-semibold text-green-600">FREE</span>
                                        </div>
                                    </div>

                                    <div className="bg-primary/10 p-6 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-gray-900">Total</span>
                                            <div className="text-right">
                                                <span className="line-through text-gray-500 mr-3">
                                                    £{(totals.subtotal + totals.delivery).toFixed(2)}
                                                </span>
                                                <span className="text-3xl font-bold text-primary">£{totals.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center max-w-2xl mx-auto mt-8">
                            <Button
                                variant="outline"
                                className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                            >
                                ← Previous Step
                            </Button>

                            <Button
                                className="px-8 py-3 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                                Next Step →
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

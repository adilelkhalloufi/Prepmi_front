import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { updatePlanData } from "@/store/slices/joinProcessSlice"
import { useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { apiRoutes } from "@/routes/api"
import { handleErrorResponse } from "@/utils"
import type { Plan as PlanType } from "@/interfaces/admin"

export const Plan = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const planData = useSelector((state: RootState) => state.joinProcess.planData)

    const [selectedProtein, setSelectedProtein] = useState(planData?.protein || '')
    const [selectedPortion, setSelectedPortion] = useState(planData?.portion || '')
    const [selectedMeals, setSelectedMeals] = useState(planData?.mealsPerWeek || 10)

    // Update local state when Redux state changes
    useEffect(() => {
        if (planData) {
            setSelectedProtein(planData.protein || '')
            setSelectedPortion(planData.portion || '')
            setSelectedMeals(planData.mealsPerWeek || 10)
        }
    }, [planData])

    // Fetch categories from API
    const { isLoading: isLoadingCategories, data: categoriesResponse } = useQuery<{data: any[]}>({
        queryKey: ["categories"],
        queryFn: () =>
            http
                .get(apiRoutes.categories)
                .then((res) => {
                    return res.data;
                })
                .catch((e) => {
                    handleErrorResponse(e);
                    throw e;
                }),
    });

    // Fetch plans from API
    const { isLoading: isLoadingPlans, data: plansResponse } = useQuery<{data: any[]}>({
        queryKey: ["plans"],
        queryFn: () =>
            http
                .get(apiRoutes.plans)
                .then((res) => {
                    return res.data;
                })
                .catch((e) => {
                    handleErrorResponse(e);
                    throw e;
                }),
    });

    const categories = categoriesResponse?.data || [];
    const plans = plansResponse?.data || [];

    // Map categories to protein options format
    const proteinOptions = categories.length > 0 
        ? categories.map((category: any) => ({
            id: category.id?.toString() || category.slug,
            label: category.name,
            description: category.description || ''
        }))
        : [
            { id: 'meat-vegan', label: t('plan.protein.options.meatVegan.label'), description: t('plan.protein.options.meatVegan.description') },
            { id: 'meat-only', label: t('plan.protein.options.meatOnly.label'), description: t('plan.protein.options.meatOnly.description') },
            { id: 'vegan-only', label: t('plan.protein.options.veganOnly.label'), description: t('plan.protein.options.veganOnly.description') }
        ];

    const portionOptions = [
        {
            id: 'standard',
            label: t('plan.portion.options.standard.label'),
            calories: t('plan.portion.options.standard.calories'),
            protein: t('plan.portion.options.standard.protein'),
            price: 0
        },
        {
            id: 'large',
            label: t('plan.portion.options.large.label'),
            calories: t('plan.portion.options.large.calories'),
            protein: t('plan.portion.options.large.protein'),
            price: 1.99
        },
        {
            id: 'lean',
            label: t('plan.portion.options.lean.label'),
            calories: t('plan.portion.options.lean.calories'),
            protein: t('plan.portion.options.lean.protein'),
            price: 1.99
        }
    ]

    // Map plans to meal options format
    const mealOptions: PlanType[] = plans;

    const handleProteinSelect = (proteinId: string) => {
        const selectedCategory = categories.find(cat => cat.id?.toString() === proteinId)
        
        setSelectedProtein(proteinId)
        dispatch(updatePlanData({ 
            protein: proteinId,
            categoryId: selectedCategory?.id,
            categoryName: selectedCategory?.name,
            category: selectedCategory // Store the complete category object
        }))
    }

    const handlePortionSelect = (portion: string) => {
        setSelectedPortion(portion)
        dispatch(updatePlanData({ portion }))
    }

    const handleMealSelect = (meals: number) => {
        const selectedPlan = mealOptions.find(plan => plan.meals_per_week === meals)
        
        if (selectedPlan) {
            setSelectedMeals(meals)
            dispatch(updatePlanData({ 
                planId: selectedPlan.id,
                planName: selectedPlan.name,
                mealsPerWeek: selectedPlan.meals_per_week,
                pricePerWeek: Number(selectedPlan.price_per_week),
                deliveryFee: Number(selectedPlan.delivery_fee || 0),
                isFreeShipping: selectedPlan.is_free_shipping,
                pointsValue: selectedPlan.points_value,
                plan: selectedPlan // Store the complete plan object
            }))
        }
    }

    const calculateTotal = () => {
        const selectedPlan = mealOptions.find(plan => plan.meals_per_week === selectedMeals)
        const portionExtra = selectedPortion && selectedPortion !== 'standard' ? 1.99 * selectedMeals : 0
        const pricePerWeek = Number(selectedPlan?.price_per_week || 0)
        const subtotal = pricePerWeek + portionExtra
        const discount = 0 // Calculate discount if you have original price field
        const delivery = selectedPlan?.is_free_shipping ? 0 : Number(selectedPlan?.delivery_fee || 0)

        return { subtotal, discount, delivery, total: subtotal + delivery }
    }

    const totals = calculateTotal()

    return (
        <div className="min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('plan.title')}
                        <span className="text-primary"> {t('plan.titleHighlight')}</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t('plan.subtitle')}
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
                                {t('plan.protein.title')}
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                {t('plan.protein.subtitle')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {isLoadingCategories ? (
                                // Loading skeleton
                                Array.from({ length: 3 }).map((_, index) => (
                                    <Card key={index} className="border-2 border-gray-200">
                                        <CardContent className="p-8 text-center">
                                            <div className="animate-pulse">
                                                <div className="h-6 bg-gray-200 rounded mb-3 mx-auto w-3/4"></div>
                                                <div className="h-4 bg-gray-200 rounded mx-auto w-full"></div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                proteinOptions.map((option) => (
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
                                                    <Badge className="bg-primary text-primary-foreground">{t('common.selected')}</Badge>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Portion Preference */}
                    {/* <div className="space-y-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-xl mb-4">
                                2
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                {t('plan.portion.title')}
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
                                            +{t('menu.currency')}{option.price}/{t('common.meal')}
                                        </Badge>
                                    )}
                                    <CardContent className="p-8 text-center">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{option.label}</h3>
                                        <p className="text-gray-600 mb-2">{option.calories}</p>
                                        <p className="text-gray-600 font-medium">{option.protein}</p>
                                        {selectedPortion === option.id && (
                                            <div className="mt-4">
                                                <Badge className="bg-primary text-primary-foreground">{t('common.selected')}</Badge>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div> */}

                    {/* Meals Per Week */}
                    <div className="space-y-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-xl mb-4">
                                2
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                {t('plan.meals.title')}
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                {t('plan.meals.subtitle')}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                             {isLoadingPlans ? (
                                // Loading skeleton
                                Array.from({ length: 6 }).map((_, index) => (
                                    <Card key={index} className="border-2 border-gray-200">
                                        <CardContent className="p-6 text-center">
                                            <div className="animate-pulse">
                                                <div className="h-8 bg-gray-200 rounded mb-2 mx-auto w-1/2"></div>
                                                <div className="h-4 bg-gray-200 rounded mb-1 mx-auto w-3/4"></div>
                                                <div className="h-5 bg-gray-200 rounded mx-auto w-2/3"></div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                mealOptions.filter(plan => plan.is_active).map((plan) => (
                                    <Card
                                        key={plan.id}
                                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${selectedMeals === plan.meals_per_week
                                            ? 'border-primary bg-primary/10 shadow-lg'
                                            : 'border-gray-200 hover:border-primary/30'
                                            }`}
                                        onClick={() => handleMealSelect(plan.meals_per_week)}
                                    >
                                        <CardContent className="p-6 text-center">
                                            <div className="text-3xl font-bold text-gray-900 mb-2">{plan.meals_per_week}</div>
                                            <div className="text-sm text-gray-600 mb-1">
                                                {plan.name}
                                            </div>
                                            <div className="text-lg font-bold text-primary">
                                                {t('menu.currency')} {Number(plan.price_per_week).toFixed(2)}/{t('common.week')}
                                            </div>
                                            {plan.is_free_shipping && (
                                                <Badge className="mt-2 bg-green-500 text-white text-xs">{t('plan.summary.free')} {t('plan.summary.delivery')}</Badge>
                                            )}
                                            {selectedMeals === plan.meals_per_week && (
                                                <div className="mt-3">
                                                    <Badge className="bg-primary text-primary-foreground">{t('common.selected')}</Badge>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>

                        {/* Order Summary */}
                        <Card className="bg-white border-2 border-gray-100 shadow-xl max-w-2xl mx-auto">
                            <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                                <CardTitle className="text-2xl font-bold text-center">{t('plan.summary.title')}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="font-semibold text-gray-700">{t('plan.summary.pricePerMeal')}</span>
                                        <div className="text-right">
                                            <span className="font-bold text-xl text-primary">
                                                {(Number(mealOptions.find(o => o.meals_per_week === selectedMeals)?.price_per_week || 0) / selectedMeals).toFixed(2)}
                                                {t('menu.currency')}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-700">{t('plan.summary.mainMeals')} ({selectedMeals})</span>
                                        <div className="text-right">
                                            <span className="font-semibold text-lg">
                                                {totals.subtotal.toFixed(2)}
                                                {t('menu.currency')}
                                            </span>
                                        </div>
                                    </div>

                                    {totals.discount > 0 && (
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <span className="text-green-600 font-medium">{t('plan.summary.discount')}</span>
                                            <span className="font-semibold text-green-600">
                                                -{totals.discount.toFixed(2)} 
                                                {t('menu.currency')}
                                                {t('plan.summary.off')}
                                                </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-700">{t('plan.summary.delivery')}</span>
                                        <div className="text-right">
                                            {totals.delivery > 0 ? (
                                                <span className="font-semibold">{t('menu.currency')}{totals.delivery.toFixed(2)}</span>
                                            ) : (
                                                <span className="font-semibold text-green-600">{t('plan.summary.free')}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-primary/10 p-6 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-gray-900">{t('plan.summary.total')}</span>
                                            <div className="text-right">
                                                <span className="text-3xl font-bold text-primary">{t('menu.currency')}{totals.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>


                    </div>
                </div>
            </div>
        </div>
    )
}
